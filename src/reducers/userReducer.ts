export type UserState = {
    displayName?: string;
    email?: string;
    uid?: string;
}

export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

interface SetUserAction {
    type: typeof SET_USER
    payload: UserState
}

interface ResetUserAction {
    type: typeof RESET_USER
}

export type UserActionTypes = SetUserAction | ResetUserAction

const initialState: UserState = {};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
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
