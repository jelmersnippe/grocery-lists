export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM';
export const RESET_LISTS = 'RESET_LISTS';

export interface List {
    name: string;
    creatorUid: string;
    items?: { [key: string]: ListItem }
}

export interface ListItem {
    name: string;
    quantity: number;
    updatedAt: Date;
}

export interface AddListAction {
    type: typeof ADD_LIST
    payload: { id: string, list: List }
}

export interface RemoveListAction {
    type: typeof REMOVE_LIST
    payload: string
}

export interface AddListItemAction {
    type: typeof ADD_LIST_ITEM;
    payload: {listId: string, listItem: { id: string, data: ListItem }}
}

export interface RemoveListItemAction {
    type: typeof REMOVE_LIST_ITEM;
    payload: {listId: string, listItemId: string}
}

export interface ResetListsAction {
    type: typeof RESET_LISTS
}






