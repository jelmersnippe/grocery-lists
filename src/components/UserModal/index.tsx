import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {useTranslation} from 'react-i18next';
import Button from '../Button';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {FirestoreUserUid} from '../../firestore/types';
import firestoreUserActions from '../../firestore/userActions';
import CustomTextInput from '../CustomTextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import UserItem from '../UserItem';
import {addUsersToFirestoreList} from '../../firestore/listActions';
import {User} from '../../reducers/userCache/types';

const UserModal: FunctionComponent<Props> = ({listId}) => {
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(listId) ? rootState.lists[listId] : undefined);
    const [users, setUsers] = useState<Array<User>>([]);
    const [usersToAdd, setUsersToAdd] = useState<Array<FirestoreUserUid>>([]);
    const [usersToRemove, setUsersToRemove] = useState<Array<FirestoreUserUid>>([]);
    const [searchUsers, setSearchUsers] = useState<Array<User>>([]);
    const [searchInput, setSearchInput] = useState('');
    const {t} = useTranslation('lists');
    const {dispatch} = useOverlayData();

    useEffect(() => {
        (async () => {
            if (selectedList) {
                const userList: Array<User> = [];
                for (const user of selectedList.users) {
                    const userData = await firestoreUserActions.getByUid(user);
                    if (userData) {
                        userList.push({uid: user, ...userData});
                    }
                }
                setUsers(userList);
            }
        })();
    }, [selectedList]);

    const searchForUsers = async (searchString: string) => {
        const foundUsers = await firestoreUserActions.search(searchString);
        setSearchUsers(foundUsers);
    };

    const removeUser = (uid: string) => {
        const newUsers = users.filter((user) => user.uid !== uid);
        if (usersToAdd.includes(uid)) {
            setUsersToAdd([...usersToAdd.filter((id) => id !== uid)]);
        } else {
            setUsersToRemove([...usersToRemove, uid]);
        }
        setUsers([...newUsers]);
    };

    const addUser = (user: User) => {
        if (usersToRemove.includes(user.uid)) {
            setUsersToRemove([...usersToRemove.filter((id) => id !== user.uid)]);
        } else {
            setUsersToAdd([...usersToAdd, user.uid]);
        }
        setUsers([...users, user]);
    };

    const saveUserChanges = async () => {
        await addUsersToFirestoreList(listId, usersToAdd, usersToRemove)
            .then(() => console.log('Users changed'))
            .catch((error) => console.log('error', error));
        dispatch(resetOverlay());
    };

    return (
        selectedList ?
            <View style={styles.container}>
                <Text>Users</Text>
                <ScrollView
                    style={styles.userContainer}
                    alwaysBounceVertical={false}
                >
                    <TouchableOpacity activeOpacity={1}>
                        {
                            users.map((user) => (
                                <UserItem
                                    key={user.uid}
                                    user={user}
                                    icon={'trash'}
                                    iconColor={'tomato'}
                                    action={(uid: string) => removeUser(uid)}
                                />
                            ))
                        }
                    </TouchableOpacity>
                </ScrollView>
                {searchUsers.length > 0 &&
                <>
                    <Text>Found users</Text>
                    <ScrollView
                        style={styles.searchResultContainer}
                        alwaysBounceVertical={false}
                    >
                        <TouchableOpacity activeOpacity={1}>
                            {
                                searchUsers.map((user) => (
                                    <UserItem
                                        key={user.uid}
                                        user={user}
                                        icon={users.find((joinedUser) => joinedUser.uid === user.uid) ? 'trash' : 'add'}
                                        iconColor={users.find((joinedUser) => joinedUser.uid === user.uid) ? 'tomato' : 'lime'}
                                        action={(uid: string) => {
                                            users.find((joinedUser) => joinedUser.uid === user.uid)
                                                ? removeUser(uid)
                                                : addUser(user);
                                        }}
                                    />
                                ))
                            }
                        </TouchableOpacity>
                    </ScrollView>
                </>
                }
                <View style={styles.searchContainer}>
                    <CustomTextInput
                        containerStyle={styles.searchInputContainer}
                        placeholder={'Username'}
                        value={searchInput}
                        onChangeText={(input) => setSearchInput(input)}
                        onSubmitEditing={() => searchForUsers(searchInput)}
                        autoCapitalize={'words'}
                        returnKeyType={'go'}
                        style={styles.searchInput}
                    />
                    <TouchableOpacity
                        onPress={() => searchForUsers(searchInput)}
                        style={styles.searchIcon}
                    >
                        <Icon name={'search'} size={40} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        text={t('common:cancel')}
                        onPress={() => dispatch(resetOverlay())}
                    />
                    <Button
                        text={t('common:save')}
                        onPress={() => saveUserChanges()}
                    />
                </View>
            </View>
            : <ActivityIndicator size={60} color={'black'}/>
    );
};

export default UserModal;
