import {AddListAction, ResetListsAction, ADD_LIST, RESET_LISTS} from './types';
import {FirestoreList} from '../../firestore/types';

export type ListsActionTypes = AddListAction | ResetListsAction

export const addList = (payload: {id: string, list: FirestoreList}): ListsActionTypes => {
    return {
        type: ADD_LIST,
        payload: payload
    };
};

export const resetLists = (): ListsActionTypes => {
    return {
        type: RESET_LISTS
    };
};
