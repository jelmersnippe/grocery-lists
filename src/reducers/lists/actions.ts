import {
    ADD_LIST,
    ADD_LIST_ITEM,
    AddListAction,
    AddListItemAction, List, ListItem,
    REMOVE_LIST,
    REMOVE_LIST_ITEM,
    RemoveListAction,
    RemoveListItemAction,
    RESET_LISTS,
    ResetListsAction
} from './types';

export type ListsActionTypes = AddListAction | RemoveListAction | AddListItemAction | RemoveListItemAction | ResetListsAction

export const addList = (payload: { id: string, list: List }): ListsActionTypes => {
    return {
        type: ADD_LIST,
        payload: payload
    };
};

export const removeList = (id: string): ListsActionTypes => {
    return {
        type: REMOVE_LIST,
        payload: id
    };
};

export const addListItem = (payload: { listId: string, listItem: { id: string, data: ListItem } }): ListsActionTypes => {
    return {
        type: ADD_LIST_ITEM,
        payload: payload
    };
};

export const removeListItem = (payload: { listId: string, listItemId: string }): ListsActionTypes => {
    return {
        type: REMOVE_LIST_ITEM,
        payload: payload
    };
};

export const resetLists = (): ListsActionTypes => {
    return {
        type: RESET_LISTS
    };
};
