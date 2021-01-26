import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import React, {FunctionComponent} from 'react';
import {Props} from './props';
import styles from './styles';
import {User} from '../../reducers/userCache/types';
import {UserItem} from './UserItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {useTranslation} from 'react-i18next';
import theme from '../../config/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import UserSearch from '../UserSearch';
import {addFirestoreListUsers} from '../../firestore/listActions';

const UserView: FunctionComponent<Props> = ({listId, users, editable, removeAction}) => {
    const currentUserId = useSelector((rootState: RootState) => rootState.user.uid);
    const {dispatch} = useOverlayData();
    const {t} = useTranslation();

    const renderUserItem = (user: User): JSX.Element => {
        return (
            <UserItem
                key={user.uid}
                user={user}
                editable={editable}
                removeAction={(userId) => removeAction(userId)}
                isCurrentUser={user.uid === currentUserId}
            />
        );
    };

    const openUserSearch = () => {
        dispatch(setOverlay({
            wrapperStyle: {height: '80%', marginTop: 'auto', borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
            content: (<UserSearch
                saveAction={async (usersToAdd) => await addFirestoreListUsers(listId, usersToAdd)}
                initialUsers={users.map((user) => user.uid)}
            />),
            animationType: 'slide'
        }));
    };

    return (
        users.length > 0 ?
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                    <Text style={styles.title}>{t('common:users')}</Text>
                    <TouchableOpacity
                        onPress={() => openUserSearch()}
                        style={{...theme.iconButton, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, marginLeft: 'auto'}}
                    >
                        <Icon name={'people'} size={32} color={theme.colors.black}/>
                        <Icon name={'add'} size={26} color={theme.colors.black}/>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={styles.userContainer}
                    alwaysBounceVertical={false}
                >
                    {users.map((user) => renderUserItem(user))}
                </ScrollView>
            </View>
            : null
    );
};

export default UserView;
