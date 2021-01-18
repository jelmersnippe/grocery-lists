import {FirestoreUserUid} from '../../firestore/types';

export const ADD_CACHED_USER = 'ADD_CACHED_USER';
export const REMOVE_CACHED_USER = 'REMOVE_CACHED_USER';
export const RESET_USER_CACHE = 'RESET_USER_CACHE';

export type User = {
    uid: FirestoreUserUid;
} & UserInfo

export interface UserInfo {
    name: string;
}

export interface AddCachedUserAction {
    type: typeof ADD_CACHED_USER
    payload: { user: User, timestamp: Date }
}

export interface RemoveCachedUser {
    type: typeof REMOVE_CACHED_USER
    payload: string
}

export interface ResetUserCacheAction {
    type: typeof RESET_USER_CACHE
}
