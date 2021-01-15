import {Text, TouchableOpacity} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Props} from './props';
import styles from './styles';

const Button: FunctionComponent<Props> = ({text, onPress, containerStyle, textStyle}) => {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, containerStyle]}
            onPress={() => onPress()}
        >
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;
