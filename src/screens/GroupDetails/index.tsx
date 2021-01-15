import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {FirestoreUser} from '../../firestore/types';
import firestoreUserActions from '../../firestore/userActions';

const GroupDetails: FunctionComponent<Props> = ({route}) => {
    const [users, setUsers] = useState<Array<FirestoreUser>>([]);
    const {id} = route.params;
    const group = useSelector((rootState: RootState) => rootState.groups[id]);

    useEffect(() => {
        (async () => {
            setUsers(await firestoreUserActions.getUsersFromDocumentRefs(group.users));
        })();
    }, [group.users]);

    const renderDetails = (): JSX.Element => (
        <View>
            <Text>Users:</Text>
            {
                users.map((user, index) => (
                    <Text key={index}>{user.name}</Text>
                ))
            }
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{group.name}</Text>
            {renderDetails()}
        </View>
    );
};

export default GroupDetails;
