import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import FullSizeLoader from '../../components/FullSizeLoader';
import {setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import UserModal from '../../components/UserModal';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import firestoreGroupActions from '../../firestore/groupActions';
import {UserInfo} from '../../reducers/userCache/types';
import firestoreUserActions from '../../firestore/userActions';
import {capitalize} from '../../utils/capitalize';

const GroupDetails: FunctionComponent<Props> = ({route}) => {
    const {id} = route.params;
    const selectedGroup = useSelector((rootState: RootState) => rootState.groups.hasOwnProperty(id) ? rootState.groups[id] : undefined);
    const [users, setUsers] = useState<Array<UserInfo>>([]);
    const {dispatch} = useOverlayData();
    const {t} = useTranslation();

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
                <TouchableOpacity
                    onPress={() => {
                        dispatch(setOverlay({
                            title: t('users'),
                            content: <UserModal
                                saveAction={async (usersToAdd, usersToRemove) => await firestoreGroupActions.addUsersToFirestoreGroup(id, usersToAdd, usersToRemove)}
                                initialUsers={selectedGroup.users}
                            />,
                            wrapperStyle: {
                                width: '80%',
                                height: '80%'
                            }
                        }));
                    }}
                >
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
