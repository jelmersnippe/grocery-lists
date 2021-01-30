import {ColorValue} from 'react-native';

export interface Props {
    onChangeValue: (qty: number) => void;
    borderColor?: ColorValue;
}
