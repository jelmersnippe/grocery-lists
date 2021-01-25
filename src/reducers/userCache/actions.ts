import {
    ADD_CACHED_USER,
    AddCachedUserAction,
    REMOVE_CACHED_USER,
    RemoveCachedUser,
    RESET_USER_CACHE,
    ResetUserCacheAction, UserInfo
} from './types';

export type UserActionTypes = AddCachedUserAction | RemoveCachedUser | ResetUserCacheAction

export const addCachedUser = (payload: { uid: string, user: UserInfo }): UserActionTypes => {
    return {
        type: ADD_CACHED_USER,
        payload: payload
    };
};

export const removeCachedUser = (uid: string): UserActionTypes => {
    return {
        type: REMOVE_CACHED_USER,
        payload: uid
    };
};

export const resetUserCache = (): UserActionTypes => {
    return {
        type: RESET_USER_CACHE
    };
};
