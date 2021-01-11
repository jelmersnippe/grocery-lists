export type User = {
    displayName?: string;
    email?: string;
    uid?: string;
}

export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

interface SetUserAction {
    type: typeof SET_USER
    payload: User
}

interface ResetUserAction {
    type: typeof RESET_USER
}

export type UserActionTypes = SetUserAction | ResetUserAction

const initialState: User = {};

const userReducer = (state = initialState, action: UserActionTypes) => {
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

export default userReducer;
