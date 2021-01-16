import {FirestoreList} from '../../firestore/types';
import {ADD_LIST, ADD_LIST_ITEM, REMOVE_LIST, REMOVE_LIST_ITEM, RESET_LISTS} from './types';
import {ListsActionTypes} from './actions';
import update from 'immutability-helper';

export type ListsState = { [key: string]: FirestoreList };

const initialState: ListsState = {};

const listsReducer = (state = initialState, action: ListsActionTypes): ListsState => {
    switch (action.type) {
        case ADD_LIST:
            return update(state, {
                $merge: {
                    [action.payload.id]: {...action.payload.list, items: {}}
                }
            });
        case REMOVE_LIST:
            return update(state, {
                $unset: [action.payload]
            });
        case ADD_LIST_ITEM:
            return update(state, {
                [action.payload.listId]: {
                    items: {
                        $merge: {
                            [action.payload.listItem.id]: action.payload.listItem.data
                        }
                    }
                }
            });
        case REMOVE_LIST_ITEM:
            return update(state, {
                [action.payload.listId]: {
                    items: {
                        $unset: [action.payload.listItemId]
                    }
                }
            });
        case RESET_LISTS:
            return initialState;
        default:
            return state;
    }
};

export default listsReducer;
