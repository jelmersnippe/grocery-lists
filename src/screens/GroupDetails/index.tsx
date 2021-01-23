import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import FullSizeLoader from '../../components/FullSizeLoader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deleteFirestoreGroup} from '../../firestore/groupActions';
import {UserInfo} from '../../reducers/userCache/types';
import firestoreUserActions from '../../firestore/userActions';
import {capitalize} from '../../utils/capitalize';

const GroupDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {id} = route.params;
    const selectedGroup = useSelector((rootState: RootState) => rootState.groups.hasOwnProperty(id) ? rootState.groups[id] : undefined);
    const [users, setUsers] = useState<Array<UserInfo>>([]);

    useEffect(() => {
        (async () => {
            if (selectedGroup?.users) {
                const newUsers: Array<UserInfo> = [];
                for (const user of selectedGroup.users) {
                    const foundUser = await firestoreUserActions.getByUid(user);
                    if (foundUser) {
                        newUsers.push(foundUser);
                    }
                }
                setUsers(newUsers);
            }
        })();
    }, [selectedGroup?.users]);

    return (
        selectedGroup ?
            <View style={styles.container}>
                <Text style={styles.title}>{selectedGroup.name}</Text>
                <TouchableOpacity onPress={async () => {
                    await deleteFirestoreGroup(id);
                    navigation.popToTop();
                }}>
                    <Icon name={'delete'} color={'tomato'} size={24}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name={'people'} size={36} color={'black'}/>
                </TouchableOpacity>
                {
                    users.map((user) => {
                        return (
                            <Text>{capitalize(user.name)}</Text>
                        );
                    })
                }
            </View>
            : <FullSizeLoader size={100} color={'black'}/>
    );
};

export default GroupDetails;
