import {FirestoreGroup} from '../../firestore/types';

export const ADD_GROUP = 'ADD_GROUP';
export const RESET_GROUPS = 'RESET_GROUPS';

export interface AddGroupAction {
    type: typeof ADD_GROUP
    payload: {
        id: string,
        group: FirestoreGroup
    }
}

export interface ResetGroupsAction {
    type: typeof RESET_GROUPS
}






