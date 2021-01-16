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

const add = (payload: { id: string, list: List }): ListsActionTypes => {
    return {
        type: ADD_LIST,
        payload: payload
    };
};

const remove = (id: string): ListsActionTypes => {
    return {
        type: REMOVE_LIST,
        payload: id
    };
};

const addItem = (payload: { listId: string, listItem: { id: string, data: ListItem } }): ListsActionTypes => {
    return {
        type: ADD_LIST_ITEM,
        payload: payload
    };
};

const removeItem = (payload: { listId: string, listItemId: string }): ListsActionTypes => {
    return {
        type: REMOVE_LIST_ITEM,
        payload: payload
    };
};

const reset = (): ListsActionTypes => {
    return {
        type: RESET_LISTS
    };
};

const lists = {
    add,
    remove,
    addItem,
    removeItem,
    reset
};

export default lists;
