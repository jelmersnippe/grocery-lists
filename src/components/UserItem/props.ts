import {ColorValue, ViewStyle} from 'react-native';
import {User} from '../../reducers/userCache/types';

export interface Props {
    user: User;
    icon: string;
    iconColor: ColorValue;
    action: (uid: string) => void;
    containerStyle?: ViewStyle;
    editable: boolean;
}
