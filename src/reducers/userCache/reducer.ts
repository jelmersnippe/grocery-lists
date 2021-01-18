import {UserActionTypes} from './actions';
import {ADD_CACHED_USER, REMOVE_CACHED_USER, RESET_USER_CACHE, UserInfo} from './types';
import update from 'immutability-helper';

export type UserCacheState = { [key: string]: UserInfo };

const initialState: UserCacheState = {};

const reducer = (state = initialState, action: UserActionTypes): UserCacheState => {
    switch (action.type) {
        case ADD_CACHED_USER:
            return update(state, {
                $merge: {
                    [action.payload.user.uid]: {
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
