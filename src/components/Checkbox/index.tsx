import React, {FunctionComponent} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import {Props} from './props';
import styles from './styles';
import {capitalize} from '../../utils/capitalize';
import theme from '../../config/theme';

const Checkbox: FunctionComponent<Props> = ({checked, onPress, label}) => {
    return (
        <TouchableOpacity
            style={styles.wrapper}
            onPress={onPress}
        >
            <View style={[styles.checkbox, {backgroundColor: checked ? theme.colors.primary : theme.colors.white}]}>
                {checked && <Icon name={'check'} size={18} color={theme.colors.primaryDark}/>}
            </View>
            {label && <Text style={styles.label}>{capitalize(label)}</Text>}
        </TouchableOpacity>
    );
};

export default Checkbox;
