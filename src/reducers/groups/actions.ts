import {ADD_GROUP, AddGroupAction, Group, REMOVE_GROUP, RemoveGroupAction, RESET_GROUPS, ResetGroupsAction} from './types';

export type GroupsActionTypes = AddGroupAction | RemoveGroupAction | ResetGroupsAction

export const addGroup = (payload: { id: string, group: Group }): GroupsActionTypes => {
    return {
        type: ADD_GROUP,
        payload: payload
    };
};

export const removeGroup = (id: string): GroupsActionTypes => {
    return {
        type: REMOVE_GROUP,
        payload: id
    };
};

export const resetGroups = (): GroupsActionTypes => {
    return {
        type: RESET_GROUPS
    };
};
