import React, {forwardRef} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Props} from './props';
import styles from './styles';

// TODO: Implement forwardRef
const CustomTextInput = forwardRef<TextInput, Props>(({containerStyle, label, labelStyle, ...props}, ref) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            <TextInput
                {...props}
                style={[styles.input, props.style]}
                ref={ref}
            />
        </View>
    );
});

export default CustomTextInput;
