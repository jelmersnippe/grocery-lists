export const LANGUAGES: Array<Language> = [
    {
        key: 'en',
        label: 'English'
    },
    {
        key: 'nl',
        label: 'Nederlands'
    }
];

interface Language {
    key: string,
    label: string
}

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const RESET_SETTINGS = 'RESET_SETTINGS';


export interface SetLanguageAction {
    type: typeof SET_LANGUAGE
    payload: string
}

export interface ResetSettingsAction {
    type: typeof RESET_SETTINGS
}
