import {UserState} from './reducer';

export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

export interface SetUserAction {
    type: typeof SET_USER
    payload: UserState
}

export interface ResetUserAction {
    type: typeof RESET_USER
}
