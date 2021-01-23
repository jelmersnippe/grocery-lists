import {ViewStyle} from 'react-native';
import {FirestoreSearchResult} from '../../../firestore/types';

export interface Props {
    user: FirestoreSearchResult;
    icon: string;
    action: (uid: string) => void;
    containerStyle?: ViewStyle;
    editable: boolean;
}
