import {Text, TouchableOpacity} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Props} from './props';
import theme from '../../config/theme';

const Button: FunctionComponent<Props> = ({text, onPress, containerStyle, textStyle}) => {
    return (
        <TouchableOpacity
            style={[theme.buttons.primary.container, containerStyle]}
            onPress={() => onPress()}
        >
            <Text style={[theme.buttons.primary.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;
