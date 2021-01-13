import {AddGroupAction, ResetGroupsAction, ADD_GROUP, RESET_GROUPS} from './types';
import {FirestoreGroup} from '../../firestore/types';

export type GroupsActionTypes = AddGroupAction | ResetGroupsAction

export const addGroup = (group: FirestoreGroup): GroupsActionTypes => {
    return {
        type: ADD_GROUP,
        payload: group
    };
};

export const resetGroups = (): GroupsActionTypes => {
    return {
        type: RESET_GROUPS
    };
};
