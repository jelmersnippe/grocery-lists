import {FirestoreGroup} from '../../firestore/types';
import {ADD_GROUP, RESET_GROUPS} from './types';
import {GroupsActionTypes} from './actions';
import update from 'immutability-helper';

export type GroupsState = { [key: string]: FirestoreGroup };

const initialState: GroupsState = {};

const groupsReducer = (state = initialState, action: GroupsActionTypes): GroupsState => {
    switch (action.type) {
        case ADD_GROUP:
            return update(state, {$merge: {[action.payload.id]: action.payload.group}});
        case RESET_GROUPS:
            return initialState;
        default:
            return state;
    }
};

export default groupsReducer;
