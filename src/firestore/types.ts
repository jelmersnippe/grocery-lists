import {ItemStatus} from '../reducers/lists/types';

export type FirestoreUserUid = string

export type FirestoreList = {
    name: string;
    creator: FirestoreUserUid;
    items?: { [key: string]: FirestoreListItem }
    users: Array<FirestoreUserUid>;
}

export type FirestoreListItem = {
    name: string;
    quantity: number;
    status: ItemStatus;
    addedBy: FirestoreUserUid;
    updatedAt: number;
}

export type FirestoreUser = {
    name: string;
}

export type FirestoreGroup = {
    name: string;
    creator: FirestoreUserUid;
    users: Array<FirestoreUserUid>;
}

export type FirestoreSearchResult = {
    name: string;
    uid: string;
}
