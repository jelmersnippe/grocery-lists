import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../Text';
import {Props} from './props';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {useTranslation} from 'react-i18next';
import {capitalize} from '../../../utils/capitalize';
import theme from '../../../config/theme';

const SearchResultItem: FunctionComponent<Props> = ({user, icon, action, containerStyle, editable}) => {
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
                <Icon name={icon} size={26} color={theme.colors.black}/>
            </TouchableOpacity>
            }
        </View>
    );
};

export default SearchResultItem;
