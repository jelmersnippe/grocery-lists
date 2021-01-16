import {UserActionTypes} from './actions';
import {ADD_CACHED_USER, REMOVE_CACHED_USER, RESET_USER_CACHE} from './types';
import {FirestoreUser} from '../../firestore/types';
import update from 'immutability-helper';

export type UserCacheState = { [key: string]: FirestoreUser };

const initialState: UserCacheState = {};

const reducer = (state = initialState, action: UserActionTypes): UserCacheState => {
    switch (action.type) {
        case ADD_CACHED_USER:
            return update(state, {
                $merge: {
                    [action.payload.id]: {
                        ...action.payload.user,
                        timestamp: action.payload.timestamp
                    }
                }
            });
        case REMOVE_CACHED_USER:
            return update(state, {
                $unset: [action.payload]
            });
        case RESET_USER_CACHE:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
