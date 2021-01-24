import {LANGUAGES, RESET_SETTINGS, SET_LANGUAGE} from './types';
import {SettingsActionTypes} from './actions';

export type SettingsState = {
    language: string
};

const initialState: SettingsState = {
    language: LANGUAGES[0].key
};

const reducer = (state = initialState, action: SettingsActionTypes): SettingsState => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            };
        case RESET_SETTINGS:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
