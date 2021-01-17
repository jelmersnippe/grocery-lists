import {TextInputProps, TextStyle, ViewStyle} from 'react-native';

export type Props = {
    label?: string;
    labelStyle?: TextStyle;
    containerStyle?: ViewStyle;
} & TextInputProps
