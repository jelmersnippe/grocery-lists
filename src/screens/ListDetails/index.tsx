import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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

enum Tab {
    TASKS = 'Tasks',
    USERS = 'USERS'
}

const ListDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {dispatch} = useOverlayData();
    const {id} = route.params;
    const currentUserId = useSelector((rootState: RootState) => rootState.user.uid);
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(id) ? rootState.lists[id] : undefined);
    const listCreatedByCurrentUser = selectedList?.creatorUid === currentUserId;
    const [creator, setCreator] = useState<UserInfo | undefined>(undefined);
    const [users, setUsers] = useState<Array<User>>([]);

    const [currentTab, setCurrentTab] = useState<Tab>(Tab.TASKS);

    const {t} = useTranslation('lists');

    useEffect(() => {
        const listName = selectedList?.name;
        if (listName) {
            navigation.setOptions({title: listName});
        }
    }, [selectedList?.name]);

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
    }, []);

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

    return (
        selectedList ?
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{selectedList.name}</Text>
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
                            >
                                <Icon name={'edit'} size={30} color={'black'}/>
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
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        onPress={() => setCurrentTab(Tab.TASKS)}
                        disabled={currentTab === Tab.TASKS}
                        style={[styles.tabButton, currentTab === Tab.TASKS && styles.activeTabButton]}
                    >
                        <Text style={styles.tabButtonText}>Tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setCurrentTab(Tab.USERS)}
                        disabled={currentTab === Tab.USERS}
                        style={[styles.tabButton, currentTab === Tab.USERS && styles.activeTabButton]}
                    >
                        <Text style={styles.tabButtonText}>Users</Text>
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
                                    style={styles.fab}
                                    onPress={() => openUserSearch()}
                                >
                                    <Icon name={'search'} size={32} color={'white'}/>
                                </TouchableOpacity>
                            }
                        </>
                }

            </View>
            : <FullSizeLoader size={100} color={'black'}/>
    );
};

export default ListDetails;
