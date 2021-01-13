import {UserActionTypes} from './actions';
import {SET_USER, RESET_USER} from './types';

export type UserState = {
    displayName?: string;
    email?: string;
    uid?: string;
};

const initialState: UserState = {};

const reducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.payload
            };
        case RESET_USER:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
