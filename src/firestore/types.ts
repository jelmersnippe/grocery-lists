import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type FirestoreList = {
    name: string;
    creator: FirebaseFirestoreTypes.DocumentReference;
    items?: { [key: string]: FirestoreListItem }
}

export type FirestoreListItem = {
    name: string;
    quantity: number;
}

export type FirestoreUser = {
    name: string;
}

export type FirestoreGroup = {
    name: string;
    users: Array<FirebaseFirestoreTypes.DocumentReference>;
}
