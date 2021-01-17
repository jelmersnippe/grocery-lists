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
    updatedAt: number;
}

export type FirestoreUser = {
    name: string;
}

export type FirestoreGroup = {
    name: string;
    users: Array<FirestoreUserUid>;
}
