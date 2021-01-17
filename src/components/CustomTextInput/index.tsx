import React, {FunctionComponent} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Props} from './props';
import styles from './styles';

// TODO: Implement forwardRef
const CustomTextInput: FunctionComponent<Props> = ({containerStyle, label, labelStyle, ...props}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            <TextInput
                {...props}
                style={[styles.input, props.style]}
            />
        </View>
    );
};

export default CustomTextInput;
