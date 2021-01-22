import {Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Button from '../Button';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {FirestoreUserSearchResult, FirestoreUserUid} from '../../firestore/types';
import firestoreUserActions from '../../firestore/userActions';
import CustomTextInput from '../CustomTextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import UserItem from '../UserItem';
import {User} from '../../reducers/userCache/types';

const UserModal: FunctionComponent<Props> = ({saveAction, initialUsers}) => {
    const [users, setUsers] = useState<Array<User>>([]);
    const [userUids, setUserUids] = useState<Array<FirestoreUserUid>>([]);

    const [usersToAdd, setUsersToAdd] = useState<Array<FirestoreUserUid>>([]);
    const [usersToRemove, setUsersToRemove] = useState<Array<FirestoreUserUid>>([]);
    const [searchUsers, setSearchUsers] = useState<Array<FirestoreUserSearchResult>>([]);
    const [searchInput, setSearchInput] = useState('');
    const {t} = useTranslation('lists');
    const {dispatch} = useOverlayData();

    useEffect(() => {
        (async () => {
            if (initialUsers) {
                const userList: Array<User> = [];
                for (const user of initialUsers) {
                    const userData = await firestoreUserActions.getByUid(user);
                    if (userData) {
                        userList.push({uid: user, ...userData});
                    }
                }
                setUsers(userList);
                setUserUids(userList.map((user) => user.uid));
            }
        })();
    }, [initialUsers]);

    const renderUserItem = (user: FirestoreUserSearchResult) => {
        const toBeAdded = usersToAdd.includes(user.uid);
        const toBeRemoved = usersToRemove.includes(user.uid);
        const removable = toBeAdded || (userUids.includes(user.uid) && !toBeRemoved);

        return (
            <UserItem
                key={user.uid}
                user={user}
                icon={removable ? 'trash' : 'add'}
                iconColor={removable ? 'tomato' : 'black'}
                action={(uid: string) => {
                    removable
                        ? removeUser(uid)
                        : addUser(user);
                }}
                containerStyle={{
                    opacity: toBeRemoved ? 0.4 : 1,
                    backgroundColor: toBeAdded ? 'lime' : toBeRemoved ? 'tomato' : 'lightgray'
                }}
            />
        );
    };

    const searchForUsers = async (searchString: string) => {
        const foundUsers = await firestoreUserActions.search(searchString);
        setSearchUsers(foundUsers);
    };

    const removeUser = (uid: string) => {
        if (usersToAdd.includes(uid)) {
            setUsersToAdd([...usersToAdd.filter((id) => id !== uid)]);
            const newUsers = users.filter((user) => user.uid !== uid);
            setUsers([...newUsers]);
        } else if (!usersToRemove.includes(uid)) {
            setUsersToRemove([...usersToRemove, uid]);
        }
    };

    const addUser = (user: User) => {
        if (usersToRemove.includes(user.uid)) {
            setUsersToRemove([...usersToRemove.filter((id) => id !== user.uid)]);
        } else {
            setUsersToAdd([...usersToAdd, user.uid]);
            setUsers([...users, user]);
        }
    };

    const saveUserChanges = async () => {
        await saveAction(usersToAdd, usersToRemove);
        dispatch(resetOverlay());
    };

    return (
        <View style={styles.container}>
            <Text>Users</Text>
            <ScrollView
                style={styles.userContainer}
                alwaysBounceVertical={false}
            >
                <TouchableOpacity activeOpacity={1}>
                    {users.map((user) => renderUserItem(user))}
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
                            searchUsers.map((user) => renderUserItem(user))
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
                    onPress={async () => {
                        Keyboard.dismiss();
                        await searchForUsers(searchInput);
                    }}
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
    );
};

export default UserModal;
