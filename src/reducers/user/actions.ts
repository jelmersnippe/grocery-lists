import {UserState} from './reducer';
import {RESET_USER, ResetUserAction, SET_USER, SetUserAction} from './types';

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
