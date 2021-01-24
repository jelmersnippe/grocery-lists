import {RESET_SETTINGS, ResetSettingsAction, SET_LANGUAGE, SetLanguageAction} from './types';

export type SettingsActionTypes = SetLanguageAction | ResetSettingsAction

export const setLanguage = (payload: string): SettingsActionTypes => {
    return {
        type: SET_LANGUAGE,
        payload: payload
    };
};

export const resetSettings = (): SettingsActionTypes => {
    return {
        type: RESET_SETTINGS
    };
};
