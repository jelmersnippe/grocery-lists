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
    addFirestoreListUsers,
    removeFirestoreListUsers,
    subscribeToFirestoreListItemUpdates,
    updateFirestoreList
} from '../../firestore/listActions';
import InputModal from '../../components/ModalContent/InputModal';
import UserView from '../../components/UserView';
import {User, UserInfo} from '../../reducers/userCache/types';
import {capitalize} from '../../utils/capitalize';
import ListItemView from '../../components/ListItemView';
import UserSearch from '../../components/UserSearch';
import GroupView from '../../components/GroupView';
import theme from '../../config/theme';
import {Picker} from '@react-native-picker/picker';

enum Tab {
    TASKS = 'Tasks',
    USERS = 'USERS'
}

const ListDetails: FunctionComponent<Props> = ({route}) => {
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

    const openUserSearch = () => {
        dispatch(setOverlay({
            wrapperStyle: {height: '80%', marginTop: 'auto', borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
            content: (<UserSearch
                saveAction={async (usersToAdd) => await addFirestoreListUsers(id, usersToAdd)}
                initialUsers={users.map((user) => user.uid)}
                nonEditableUsers={selectedList?.groupData?.map((group) =>
                    group.users).reduce<Array<string>>((acc, cur) => {
                        return [...acc, ...cur];
                    }, [])}
            />),
            animationType: 'slide'
        }));
    };

    const renderListPickerItems = (): Array<JSX.Element> => {
        const listPickerItems: Array<JSX.Element> = [];
        for (const key of Object.keys(lists)) {
            const list = lists[key];
            listPickerItems.push(
                <Picker.Item label={list.name} value={key}/>
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
                            style={{flex: 1}}
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
                                    />,
                                    wrapperStyle: {
                                        width: '60%'
                                    }
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
                        ]}>Tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setCurrentTab(Tab.USERS)}
                        disabled={currentTab === Tab.USERS}
                        style={[styles.tabButton, currentTab === Tab.USERS && {...styles.activeTabButton, ...theme.heavyShadow}]}
                    >
                        <Text style={[
                            styles.tabButtonText,
                            currentTab === Tab.USERS && styles.activeTabButtonText
                        ]}>Users</Text>
                    </TouchableOpacity>
                </View>

                {
                    currentTab === Tab.TASKS ?
                        <ListItemView listId={id} items={selectedList?.items}/>
                        :
                        <>
                            <GroupView
                                groups={selectedList.groupData ?? []}
                                editable={listCreatedByCurrentUser}
                                listId={id}
                            />
                            <UserView
                                users={users}
                                editable={listCreatedByCurrentUser}
                                removeAction={(userId) => removeFirestoreListUsers(id, [userId])}
                            />
                            {
                                listCreatedByCurrentUser &&
                                <TouchableOpacity
                                    style={theme.floatingActionButton}
                                    onPress={() => openUserSearch()}
                                >
                                    <Icon name={'search'} size={32} color={theme.colors.white}/>
                                </TouchableOpacity>
                            }
                        </>
                }

            </View>
            : <FullSizeLoader size={100} color={theme.colors.black}/>
    );
};

export default ListDetails;
