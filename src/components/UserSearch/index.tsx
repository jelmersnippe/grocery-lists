import {ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import SearchBar from './SearchBar';
import Button from '../Button';
import React, {FunctionComponent, useState} from 'react';
import {searchFirestoreUsers} from '../../firestore/userActions';
import {FirestoreSearchResult, FirestoreUserUid} from '../../firestore/types';
import SearchResultItem from './SearchResultItem';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {Props} from './props';

const UserSearch: FunctionComponent<Props> = ({initialUsers, saveAction, nonEditableUsers}) => {
    const [userResults, setUserResults] = useState<Array<FirestoreSearchResult>>([]);
    const [usersToAdd, setUsersToAdd] = useState<Array<FirestoreUserUid>>([]);

    const {dispatch} = useOverlayData();

    const saveUserChanges = async () => {
        await saveAction(usersToAdd);
        setUsersToAdd([]);
        dispatch(resetOverlay());
    };

    const searchForUsers = async (searchString: string) => {
        const foundUsers = await searchFirestoreUsers(searchString);
        setUserResults(foundUsers);
    };

    const renderUserItem = (user: FirestoreSearchResult): JSX.Element => {
        const toBeAdded = usersToAdd.includes(user.uid);

        return (
            <SearchResultItem
                key={user.uid}
                user={user}
                icon={usersToAdd.includes(user.uid) ? 'undo' : 'add'}
                editable={(!nonEditableUsers || !nonEditableUsers.includes(user.uid)) || initialUsers.includes(user.uid)}
                action={(uid: string) => updateUsersToAdd(uid)}
                containerStyle={{
                    backgroundColor: toBeAdded ? 'lime' : 'lightgray'
                }}
            />
        );
    };

    const updateUsersToAdd = (uid: string) => {
        if (usersToAdd.includes(uid)) {
            setUsersToAdd([...usersToAdd.filter((id) => id !== uid)]);
        } else {
            setUsersToAdd([...usersToAdd, uid]);
        }
    };

    return (
        <>
            {
                userResults.length > 0 &&
                <>
                    <Text>Found users</Text>
                    <ScrollView
                        style={styles.searchResultContainer}
                        alwaysBounceVertical={false}
                    >
                        <TouchableOpacity activeOpacity={1}>
                            {
                                userResults.map((user) => renderUserItem(user))
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
