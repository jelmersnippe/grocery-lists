import React, {FunctionComponent} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';

const Checkbox: FunctionComponent<Props> = ({checked, onPress, label}) => {
    return (
        <TouchableOpacity
            style={styles.wrapper}
            onPress={() => onPress()}
        >
            <View style={[styles.checkbox, {backgroundColor: checked ? 'black' : 'white'}]}>
                {checked && <Icon name={'checkmark-sharp'} size={18} color={'white'}/>}
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

export default Checkbox;
