import {FirestoreUserUid} from '../../firestore/types';
import {Group} from '../groups/types';

export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM';
export const RESET_LISTS = 'RESET_LISTS';

export enum ItemStatus {
    TODO = 'TODO',
    DONE = 'DONE'
}

export interface List {
    name: string;
    creatorUid: FirestoreUserUid;
    items?: { [key: string]: ListItem };
    users: Array<FirestoreUserUid>;
    groups?: Array<string>;
    groupData?: Array<Group>;
}

// Probably add a 'completedAt' timestamp
export interface ListItem {
    name: string;
    quantity: number;
    status: ItemStatus;
    updatedAt: Date;
    addedBy: FirestoreUserUid;
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
    payload: { listId: string, listItem: { id: string, data: ListItem } }
}

export interface RemoveListItemAction {
    type: typeof REMOVE_LIST_ITEM;
    payload: { listId: string, listItemId: string }
}

export interface ResetListsAction {
    type: typeof RESET_LISTS
}






