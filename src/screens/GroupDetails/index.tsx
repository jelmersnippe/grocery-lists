import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import FullSizeLoader from '../../components/FullSizeLoader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deleteFirestoreGroup, updateFirestoreGroupUsers} from '../../firestore/groupActions';
import {User} from '../../reducers/userCache/types';
import firestoreUserActions from '../../firestore/userActions';
import UserView from '../../components/UserView';
import {setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import UserSearch from '../../components/UserSearch';
import {capitalize} from '../../utils/capitalize';

const GroupDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {id} = route.params;
    const currentUserId = useSelector((rootState: RootState) => rootState.user.uid);
    const selectedGroup = useSelector((rootState: RootState) => rootState.groups.hasOwnProperty(id) ? rootState.groups[id] : undefined);
    const createdByUser = selectedGroup?.creatorUid === currentUserId;
    const [users, setUsers] = useState<Array<User>>([]);
    const {dispatch} = useOverlayData();

    useEffect(() => {
        (async () => {
            if (selectedGroup?.users) {
                const newUsers: Array<User> = [];
                for (const user of selectedGroup.users) {
                    const foundUser = await firestoreUserActions.getByUid(user);
                    if (foundUser) {
                        newUsers.push({
                            uid: user,
                            ...foundUser
                        });
                    }
                }
                setUsers(newUsers);
            }
        })();
    }, [selectedGroup?.users]);

    const openUserSearch = () => {
        dispatch(setOverlay({
            wrapperStyle: {height: '80%', marginTop: 'auto', borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
            content: (<UserSearch
                saveAction={async (usersToAdd, usersToRemove) => await updateFirestoreGroupUsers(id, usersToAdd, usersToRemove)}
                initialUsers={users}
            />),
            animationType: 'slide'
        }));
    };

    return (
        selectedGroup ?
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{capitalize(selectedGroup.name)}</Text>
                    <TouchableOpacity onPress={async () => {
                        await deleteFirestoreGroup(id);
                        navigation.popToTop();
                    }}>
                        <Icon name={'delete'} color={'tomato'} size={24}/>
                    </TouchableOpacity>
                </View>
                <UserView
                    users={users}
                    editable={createdByUser}
                    userRemoveAction={(userId) => updateFirestoreGroupUsers(id, [], [userId])}
                />
                {
                    createdByUser &&
                    <TouchableOpacity
                        style={styles.fab}
                        onPress={() => openUserSearch()}
                    >
                        <Icon name={'search'} size={32} color={'white'}/>
                    </TouchableOpacity>
                }
            </View>
            : <FullSizeLoader size={100} color={'black'}/>
    );
};

export default GroupDetails;
