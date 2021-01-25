import {UserActionTypes} from './actions';
import {ADD_CACHED_USER, CachedUser, REMOVE_CACHED_USER, RESET_USER_CACHE} from './types';
import update from 'immutability-helper';

export type UserCacheState = { [key: string]: CachedUser };

const initialState: UserCacheState = {};

const reducer = (state = initialState, action: UserActionTypes): UserCacheState => {
    switch (action.type) {
        case ADD_CACHED_USER:
            return update(state, {
                $merge: {
                    [action.payload.uid]: {
                        ...action.payload.user,
                        timestamp: new Date()
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
