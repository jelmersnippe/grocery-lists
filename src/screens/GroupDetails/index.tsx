import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {FirestoreUser} from '../../firestore/types';
import firestoreUserActions from '../../firestore/userActions';
import FullSizeLoader from '../../components/FullSizeLoader';

const GroupDetails: FunctionComponent<Props> = ({route}) => {
    const [groupUsers, setGroupUsers] = useState<Array<FirestoreUser>>([]);
    const {id} = route.params;
    const selectedGroup = useSelector((rootState: RootState) => rootState.groups.hasOwnProperty(id) ? rootState.groups[id] : undefined);

    useEffect(() => {
        (async () => {
            if (selectedGroup?.users) {
                setGroupUsers(await firestoreUserActions.getUsersFromDocumentRefs(selectedGroup.users));
            }
        })();
    }, [selectedGroup]);

    const renderDetails = (users: Array<FirestoreUser>): JSX.Element => (
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
        selectedGroup ?
            <View style={styles.container}>
                <Text style={styles.title}>{selectedGroup.name}</Text>
                {renderDetails(groupUsers)}
            </View>
            : <FullSizeLoader size={100} color={'black'}/>
    );
};

export default GroupDetails;
