import {FirestoreUser} from '../../firestore/types';

export const ADD_CACHED_USER = 'ADD_CACHED_USER';
export const REMOVE_CACHED_USER = 'REMOVE_CACHED_USER';
export const RESET_USER_CACHE = 'RESET_USER_CACHE';

export interface AddCachedUserAction {
    type: typeof ADD_CACHED_USER
    payload: { id: string, user: FirestoreUser, timestamp: Date }
}

export interface RemoveCachedUser {
    type: typeof REMOVE_CACHED_USER
    payload: string
}

export interface ResetUserCacheAction {
    type: typeof RESET_USER_CACHE
}
