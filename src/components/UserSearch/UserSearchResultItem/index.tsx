import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {useTranslation} from 'react-i18next';
import {capitalize} from '../../../utils/capitalize';

const UserSearchResultItem: FunctionComponent<Props> = ({user, icon, iconColor, action, containerStyle, editable}) => {
    const currentUserId = useSelector((rootState: RootState) => rootState.user.uid);
    const {t} = useTranslation();

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.name}>{capitalize(user.name)}{user.uid === currentUserId && ` (${t('common:you')})`}</Text>
            {(user.uid !== currentUserId && editable) &&
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => action(user.uid)}
            >
                <Icon name={icon} size={26} style={{color: iconColor}}/>
            </TouchableOpacity>
            }
        </View>
    );
};

export default UserSearchResultItem;