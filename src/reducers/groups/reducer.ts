import {FirestoreGroup} from '../../firestore/types';
import {ADD_GROUP, RESET_GROUPS} from './types';
import {GroupsActionTypes} from './actions';

export type GroupsState = Array<FirestoreGroup>;

const initialState: GroupsState = [];

const groupsReducer = (state = initialState, action: GroupsActionTypes): GroupsState => {
    switch (action.type) {
        case ADD_GROUP:
            return [...state, action.payload];
        case RESET_GROUPS:
            return initialState;
        default:
            return state;
    }
};

export default groupsReducer;
