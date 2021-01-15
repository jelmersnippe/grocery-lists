import {FirestoreList} from '../../firestore/types';

export const ADD_LIST = 'ADD_LIST';
export const RESET_LISTS = 'RESET_LISTS';

export interface AddListAction {
    type: typeof ADD_LIST
    payload: { id: string, list: FirestoreList }
}

export interface ResetListsAction {
    type: typeof RESET_LISTS
}






