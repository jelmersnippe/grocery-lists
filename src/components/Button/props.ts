import {TextStyle, ViewStyle} from 'react-native';

export interface Props {
    text: string;
    onPress: () => void;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}
