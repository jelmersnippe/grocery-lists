import {UserState} from './reducer';
import {FirestoreUserUid} from '../../firestore/types';

export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

export type User = {
    uid: FirestoreUserUid;
} & UserInfo

export interface UserInfo {
    name: string;
}

export interface SetUserAction {
    type: typeof SET_USER
    payload: UserState
}

export interface ResetUserAction {
    type: typeof RESET_USER
}
