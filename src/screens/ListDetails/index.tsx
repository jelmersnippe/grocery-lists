import React, {FunctionComponent, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {resetOverlay, setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import FullSizeLoader from '../../components/FullSizeLoader';
import {getUser} from '../../firestore/userActions';
import {useTranslation} from 'react-i18next';
import {
    deleteFirestoreList,
    removeFirestoreListUsers,
    subscribeToFirestoreListItemUpdates,
    updateFirestoreList
} from '../../firestore/listActions';
import InputModal from '../../components/ModalContent/InputModal';
import UserView from '../../components/UserView';
import {User, UserInfo} from '../../reducers/userCache/types';
import {capitalize} from '../../utils/capitalize';
import ListItemView from '../../components/ListItemView';
import theme from '../../config/theme';
import {Picker} from '@react-native-picker/picker';

enum Tab {
    TASKS = 'Tasks',
    USERS = 'USERS'
}

const ListDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {dispatch} = useOverlayData();
    const [id, setId] = useState(route.params.id);
    const currentUserId = useSelector((rootState: RootState) => rootState.user.uid);
    const lists = useSelector((rootState: RootState) => rootState.lists);
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(id) ? rootState.lists[id] : undefined);
    const listCreatedByCurrentUser = selectedList?.creatorUid === currentUserId;
    const [creator, setCreator] = useState<UserInfo | undefined>(undefined);
    const [users, setUsers] = useState<Array<User>>([]);

    const [currentTab, setCurrentTab] = useState<Tab>(Tab.TASKS);
    const {t} = useTranslation('lists');

    useEffect(() => {
        const creatorUid = selectedList?.creatorUid;
        if (creatorUid) {
            (async () => {
                const creatorUserInfo = await getUser(creatorUid);
                setCreator(creatorUserInfo);
            })();
        }
    }, [selectedList?.creatorUid]);

    useEffect(() => {
        (async () => {
            if (selectedList?.users) {
                const userList: Array<User> = [];
                for (const user of selectedList?.users) {
                    const userData = await getUser(user);
                    if (userData) {
                        userList.push({uid: user, ...userData});
                    }
                }
                setUsers(userList);
            }
        })();
    }, [selectedList?.users]);

    useEffect(() => {
        return subscribeToFirestoreListItemUpdates(id);
    }, [id]);

    const updateList = (listId: string, updatedName: string) => {
        if (updatedName === '' || updatedName === selectedList?.name) {
            dispatch(resetOverlay());
            return;
        }

        updateFirestoreList(listId, updatedName);
        dispatch(resetOverlay());
    };

    const deleteList = () => {
        dispatch(setOverlay({
            title: t('deleteListTitle', {listName: selectedList?.name}),
            text: t('deleteListText'),
            buttonStyle: {marginHorizontal: 10},
            buttons: [
                {
                    text: t('common:cancel')
                },
                {
                    text: t('common:delete'),
                    style: {borderColor: theme.colors.red},
                    textStyle: {color: theme.colors.red},
                    onPress: async () => {
                        await deleteFirestoreList(id);
                        navigation.goBack();
                    }
                }
            ]
        }));
    };

    const renderListPickerItems = (): Array<JSX.Element> => {
        const listPickerItems: Array<JSX.Element> = [];
        for (const key of Object.keys(lists)) {
            const list = lists[key];
            listPickerItems.push(
                <Picker.Item key={key} label={list.name} value={key}/>
            );
        }

        return listPickerItems;
    };

    return (
        selectedList ?
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Picker
                            selectedValue={id}
                            onValueChange={(itemValue) => setId(itemValue.toString())}
                            mode={'dropdown'}
                            style={styles.listPicker}
                        >
                            {renderListPickerItems()}
                        </Picker>
                        {listCreatedByCurrentUser &&
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setOverlay({
                                    content: <InputModal
                                        defaultValue={selectedList.name}
                                        onSubmit={async (input: string) => updateList(id, input)}
                                        buttonLabel={t('common:update')}
                                        placeholder={t('newItem')}
                                        deleteAction={deleteList}
                                    />
                                }));
                            }}
                            style={theme.iconButton}
                        >
                            <Icon name={'edit'} size={30} color={theme.colors.black}/>
                        </TouchableOpacity>
                        }
                    </View>
                    {creator &&
                        <Text>
                            {t('createdBy', {
                                creator: capitalize(creator.name)
                            })}
                        </Text>
                    }
                </View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        onPress={() => setCurrentTab(Tab.TASKS)}
                        disabled={currentTab === Tab.TASKS}
                        style={[styles.tabButton, currentTab === Tab.TASKS && {...styles.activeTabButton, ...theme.heavyShadow}]}
                    >
                        <Text style={[
                            styles.tabButtonText,
                            currentTab === Tab.TASKS && styles.activeTabButtonText
                        ]}>{t('items')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setCurrentTab(Tab.USERS)}
                        disabled={currentTab === Tab.USERS}
                        style={[styles.tabButton, currentTab === Tab.USERS && {...styles.activeTabButton, ...theme.heavyShadow}]}
                    >
                        <Text style={[
                            styles.tabButtonText,
                            currentTab === Tab.USERS && styles.activeTabButtonText
                        ]}>{t('common:users')}</Text>
                    </TouchableOpacity>
                </View>
                {
                    currentTab === Tab.TASKS ?
                        <ListItemView listId={id} items={selectedList?.items}/>
                        :
                        <UserView
                            listId={id}
                            users={users}
                            editable={listCreatedByCurrentUser}
                            removeAction={(userId) => removeFirestoreListUsers(id, [userId])}
                        />
                }
            </View>
            : <FullSizeLoader size={100} color={theme.colors.black}/>
    );
};

export default ListDetails;
