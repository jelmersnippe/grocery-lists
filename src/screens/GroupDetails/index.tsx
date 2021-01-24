import React, {FunctionComponent, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text';
import {Props} from './props';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import FullSizeLoader from '../../components/FullSizeLoader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {addFirestoreGroupUsers, deleteFirestoreGroup, removeFirestoreGroupUsers} from '../../firestore/groupActions';
import {User} from '../../reducers/userCache/types';
import {getUser} from '../../firestore/userActions';
import UserView from '../../components/UserView';
import {setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import UserSearch from '../../components/UserSearch';
import {capitalize} from '../../utils/capitalize';
import theme from '../../config/theme';

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
                    const foundUser = await getUser(user);
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
                saveAction={async (usersToAdd) => await addFirestoreGroupUsers(id, usersToAdd)}
                initialUsers={selectedGroup?.users ?? []}
            />),
            animationType: 'slide'
        }));
    };

    return (
        selectedGroup ?
            <View style={theme.mainContainer}>
                <View style={theme.pageHeader}>
                    <Text style={theme.pageTitle}>{capitalize(selectedGroup.name)}</Text>
                    {
                        createdByUser &&
                        <TouchableOpacity
                            onPress={async () => {
                                await deleteFirestoreGroup(id);
                                navigation.popToTop();
                            }}
                            style={theme.iconButton}
                        >
                            <Icon name={'delete'} color={theme.colors.red} size={24}/>
                        </TouchableOpacity>
                    }
                </View>
                <UserView
                    users={users}
                    editable={createdByUser}
                    removeAction={(userId) => removeFirestoreGroupUsers(id, [userId])}
                />
                {
                    createdByUser &&
                    <TouchableOpacity
                        style={theme.floatingActionButton}
                        onPress={() => openUserSearch()}
                    >
                        <Icon name={'search'} size={32} color={theme.colors.white}/>
                    </TouchableOpacity>
                }
            </View>
            : <FullSizeLoader size={100} color={theme.colors.black}/>
    );
};

export default GroupDetails;
