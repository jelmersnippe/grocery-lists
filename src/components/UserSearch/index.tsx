import {ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import SearchBar from './SearchBar';
import Button from '../Button';
import React, {FunctionComponent, useState} from 'react';
import {searchFirestoreUsers} from '../../firestore/userActions';
import {FirestoreSearchResult, FirestoreUserUid} from '../../firestore/types';
import SearchResultItem from './SearchResultItem';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {Props} from './props';

const UserSearch: FunctionComponent<Props> = ({initialUsers, saveAction}) => {
    const [userResults, setUserResults] = useState<Array<FirestoreSearchResult>>([]);
    const [usersToAdd, setUsersToAdd] = useState<Array<FirestoreUserUid>>([]);
    const {dispatch} = useOverlayData();

    const saveUserChanges = async () => {
        await saveAction(usersToAdd);
        setUsersToAdd([]);
        dispatch(resetOverlay());
    };

    const searchForUsers = async (searchString: string) => {
        if (searchString === '') {
            setUserResults([]);
            return;
        }
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
                editable={!initialUsers.includes(user.uid)}
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
            <SearchBar searchAction={(searchInput) => searchForUsers(searchInput)}/>
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
            <Button
                text={'Save'}
                onPress={saveUserChanges}
            />
        </>
    );
};

export default UserSearch;
