import {FirestoreUserUid} from '../../firestore/types';

export const ADD_GROUP = 'ADD_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';
export const RESET_GROUPS = 'RESET_GROUPS';

export type Group = {
    uid: string;
} & GroupInfo

export interface GroupInfo {
    name: string;
    creatorUid: FirestoreUserUid;
    users: Array<FirestoreUserUid>;
}

export interface AddGroupAction {
    type: typeof ADD_GROUP;
    payload: {
        id: string,
        group: GroupInfo
    };
}

export interface RemoveGroupAction {
    type: typeof REMOVE_GROUP;
    payload: string;
}

export interface ResetGroupsAction {
    type: typeof RESET_GROUPS;
}






