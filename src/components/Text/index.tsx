import React from 'react';
import {TextProps, Text} from 'react-native';
import {FunctionComponent} from 'react';
import theme from '../../config/theme';

const CustomText: FunctionComponent<TextProps> = ({children, ...props}) => {
    return (
        <Text
            {...props}
            style={[theme.defaultText, props.style]}
        >
            {children}
        </Text>
    );
};

export default CustomText;
