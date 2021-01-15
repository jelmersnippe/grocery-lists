import {FirestoreList} from '../../firestore/types';
import {ADD_LIST, RESET_LISTS} from './types';
import {ListsActionTypes} from './actions';
import update from 'immutability-helper';

export type ListsState = { [key: string]: FirestoreList };

const initialState: ListsState = {};

const listsReducer = (state = initialState, action: ListsActionTypes): ListsState => {
    switch (action.type) {
        case ADD_LIST:
            return update(state, {$merge: {[action.payload.id]: action.payload.list}});
        case RESET_LISTS:
            return initialState;
        default:
            return state;
    }
};

export default listsReducer;
