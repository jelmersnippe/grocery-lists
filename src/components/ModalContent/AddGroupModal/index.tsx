import React, {FunctionComponent, useState} from 'react';
import {Props} from './props';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import Checkbox from '../../Checkbox';
import Button from '../../Button';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {addFirestoreListUsers, removeFirestoreListUsers} from '../../../firestore/listActions';

const AddGroupModal: FunctionComponent<Props> = ({initialUsers, listId}) => {
    const currentUser = useSelector((rootState: RootState) => rootState.user.uid);
    const groups = useSelector((rootState: RootState) => rootState.groups);
    const [usersToRemove, setUsersToRemove] = useState<Array<string>>([]);
    const [usersToAdd, setUsersToAdd] = useState<Array<string>>([]);
    const {dispatch} = useOverlayData();

    const updateUserChangeList = (allUsersInGroup: boolean, groupUsers: Array<string>) => {
        if (allUsersInGroup) {
            const filteredGroupUsers = groupUsers.filter((user) => user !== currentUser);
            setUsersToRemove([...usersToRemove, ...filteredGroupUsers]);
        } else {
            const filteredNewUsers = groupUsers.filter((user) => !initialUsers.includes(user) && !usersToAdd.includes(user));
            setUsersToAdd([...usersToAdd, ...filteredNewUsers]);
        }
    };

    const renderGroups = () => {
        const groupElements = [];
        for (const key of Object.keys(groups)) {
            const group = groups[key];
            const allUsersInGroup = group.users.every((user) =>
                initialUsers.includes(user) || usersToAdd.includes(user))
                && !group.users.some((user) => usersToRemove.includes(user));

            groupElements.push(
                <Checkbox
                    key={key}
                    label={group.name}
                    checked={allUsersInGroup}
                    onPress={() => updateUserChangeList(allUsersInGroup, group.users)}
                />
            );
        }

        return groupElements;
    };

    return (
        <>
            <ScrollView
                alwaysBounceVertical={false}
            >
                {renderGroups()}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    text={'Cancel'}
                    onPress={() => dispatch(resetOverlay())}
                />
                <Button
                    text={'Save'}
                    onPress={async() => {
                        await addFirestoreListUsers(listId, usersToAdd);
                        await removeFirestoreListUsers(listId, usersToRemove);
                        dispatch(resetOverlay());
                    }}
                />
            </View>
        </>
    );
};

export default AddGroupModal;
