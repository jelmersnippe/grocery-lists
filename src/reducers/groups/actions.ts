import {ADD_GROUP, AddGroupAction, RESET_GROUPS, ResetGroupsAction} from './types';
import {FirestoreGroup} from '../../firestore/types';

export type GroupsActionTypes = AddGroupAction | ResetGroupsAction

export const addGroup = (payload: { id: string, group: FirestoreGroup }): GroupsActionTypes => {
    return {
        type: ADD_GROUP,
        payload: payload
    };
};

export const resetGroups = (): GroupsActionTypes => {
    return {
        type: RESET_GROUPS
    };
};
