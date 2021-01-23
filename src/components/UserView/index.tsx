import {ScrollView, View, Text} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Props} from './props';
import styles from './styles';
import {User} from '../../reducers/userCache/types';
import {UserItem} from './UserItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';

const UserView: FunctionComponent<Props> = ({users, editable, removeAction}) => {
    const currentUserId = useSelector((rootState: RootState) => rootState.user.uid);

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

    return (
        users.length > 0 ?
            <View style={styles.container}>
                <Text style={styles.title}>Users</Text>
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
