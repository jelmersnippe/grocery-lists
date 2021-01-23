import {ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import SearchBar from '../SearchBar';
import Button from '../Button';
import React, {FunctionComponent, useEffect, useState} from 'react';
import firestoreUserActions from '../../firestore/userActions';
import {FirestoreUserSearchResult, FirestoreUserUid} from '../../firestore/types';
import UserSearchResultItem from './UserSearchResultItem';
import {User} from '../../reducers/userCache/types';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {Props} from './props';

const UserSearch: FunctionComponent<Props> = ({initialUsers, saveAction, nonEditableUsers}) => {
    const [users, setUsers] = useState<Array<User>>([]);
    const [userUids, setUserUids] = useState<Array<FirestoreUserUid>>([]);
    const [searchUsers, setSearchUsers] = useState<Array<FirestoreUserSearchResult>>([]);

    const [usersToAdd, setUsersToAdd] = useState<Array<FirestoreUserUid>>([]);
    const [usersToRemove, setUsersToRemove] = useState<Array<FirestoreUserUid>>([]);

    const {dispatch} = useOverlayData();

    useEffect(() => {
        (async () => {
            if (initialUsers) {
                setUsers(initialUsers);
                setUserUids(initialUsers.map((user) => user.uid));
            }
        })();
    }, [initialUsers]);

    const saveUserChanges = async () => {
        await saveAction(usersToAdd, usersToRemove);
        setUsersToAdd([]);
        setUsersToRemove([]);
        dispatch(resetOverlay());
    };

    const searchForUsers = async (searchString: string) => {
        const foundUsers = await firestoreUserActions.search(searchString);
        setSearchUsers(foundUsers);
    };

    const renderUserItem = (user: FirestoreUserSearchResult): JSX.Element => {
        const toBeAdded = usersToAdd.includes(user.uid);
        const toBeRemoved = usersToRemove.includes(user.uid);
        const removable = toBeAdded || (userUids.includes(user.uid) && !toBeRemoved);

        return (
            <UserSearchResultItem
                key={user.uid}
                user={user}
                icon={removable ? 'delete' : 'add'}
                iconColor={removable ? 'tomato' : 'black'}
                editable={!nonEditableUsers || !nonEditableUsers.includes(user.uid)}
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

    return (
        <>
            {
                searchUsers.length > 0 &&
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
            <SearchBar searchAction={(searchInput) => searchForUsers(searchInput)}/>
            <Button
                text={'Save'}
                onPress={saveUserChanges}
            />
        </>
    );
};

export default UserSearch;
