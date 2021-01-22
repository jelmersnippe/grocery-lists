import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Icon from 'react-native-vector-icons/Ionicons';
import {resetOverlay, setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import FullSizeLoader from '../../components/FullSizeLoader';
import firestoreUserActions from '../../firestore/userActions';
import {useTranslation} from 'react-i18next';
import {addUsersToFirestoreList, subscribeToFirestoreListItemUpdates, updateFirestoreList} from '../../firestore/listActions';
import InputModal from '../../components/InputModal';
import UserView from '../../components/UserView';
import {UserInfo} from '../../reducers/userCache/types';
import {capitalize} from '../../utils/capitalize';
import ListItemView from '../../components/ListItemView';

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
                const creatorUserInfo = await firestoreUserActions.getByUid(creatorUid);
                setCreator(creatorUserInfo);
            })();
        }
    }, [selectedList?.creatorUid]);

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
                                <Icon name={'create-outline'} size={30} color={'black'}/>
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
                    <TouchableOpacity onPress={() => setCurrentTab(Tab.TASKS)} disabled={currentTab === Tab.TASKS} style={[styles.tabButton, currentTab === Tab.TASKS && styles.activeTabButton]}>
                        <Text style={styles.tabButtonText}>Tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentTab(Tab.USERS)} disabled={currentTab === Tab.USERS} style={[styles.tabButton, currentTab === Tab.USERS && styles.activeTabButton]}>
                        <Text style={styles.tabButtonText}>Users</Text>
                    </TouchableOpacity>
                </View>

                {
                    currentTab === Tab.TASKS ?
                        <ListItemView listId={id} items={selectedList?.items}/>
                        :
                        <UserView
                            saveAction={async (usersToAdd, usersToRemove) => await addUsersToFirestoreList(id, usersToAdd, usersToRemove)}
                            initialUsers={selectedList.users}
                            editable={listCreatedByCurrentUser}
                        />
                }

            </View>
            : <FullSizeLoader size={100} color={'black'}/>
    );
};

export default ListDetails;
