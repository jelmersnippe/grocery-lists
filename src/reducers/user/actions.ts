import {UserState} from './reducer';
import {ResetUserAction, SetUserAction, SET_USER, RESET_USER} from './types';

export type UserActionTypes = SetUserAction | ResetUserAction

export const setUser = (user: UserState): UserActionTypes => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const resetUser = (): UserActionTypes => {
    return {
        type: RESET_USER
    };
};
