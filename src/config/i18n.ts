import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {store} from './store';

const resources = {
    en: {
        common: {
            ok: 'Ok',
            save: 'Save',
            cancel: 'Cancel',
            create: 'Create',
            update: 'Update',
            delete: 'Delete',
            add: 'Add',
            users: 'Users',
            you: 'You'
        },
        auth: {
            email: 'Email',
            password: 'Password',
            login: 'Login',
            toCreateAccount: 'Create an account instead',
            displayName: 'Display name',
            createAccount: 'Create account',
            toLogin: 'Sign in instead'
        },
        navigation: {
            Lists: 'Lists',
            Search: 'Search',
            ListOverview: 'Your lists',
            GroupOverview: 'Groups',
            App: 'Back to app',
            Profile: 'Profile',
            Logout: 'Sign out',
            Login: 'Sign in',
            CreateAccount: 'Create account'
        },
        lists: {
            yourLists: 'Your lists',
            newList: 'New list',
            newItem: 'New item',
            createdBy: 'Created by: {{creator}}',
            itemName: 'Item',
            deleteListTitle: 'Delete \'{{listName}}\'',
            deleteListText: 'Are you sure you want to delete this list?',
            items: 'Items'
        },
        groups: {
            yourGroups: 'Your groups',
            newGroup: 'New group',
            deleteGroup: 'Delete group'
        },
        profile: {
            title: 'Profile',
            displayName: 'Display name',
            updateProfile: 'Update profile'
        }
    },
    nl: {
        common: {
            ok: 'Ok',
            save: 'Opslaan',
            cancel: 'Annuleer',
            create: 'Aanmaken',
            update: 'Wijzigen',
            delete: 'Verwijderen',
            add: 'Toevoegen',
            users: 'Gebruikers',
            you: 'Jij'
        },
        auth: {
            email: 'Email',
            password: 'Wachtwoord',
            login: 'Inloggen',
            toCreateAccount: 'Een account aanmaken',
            displayName: 'Weergave naam',
            createAccount: 'Account aanmaken',
            toLogin: 'Terug naar inloggen'
        },
        navigation: {
            Groups: 'Groepen',
            Lists: 'Lijsten',
            Search: 'Zoeken',
            ListOverview: 'Jouw lijsten',
            GroupOverview: 'Jouw groepen',
            App: 'Terug naar de app',
            Profile: 'Profiel',
            Logout: 'Uitloggen',
            Login: 'Inloggen',
            CreateAccount: 'Account aanmaken'
        },
        lists: {
            yourLists: 'Jouw lijsten',
            newList: 'Nieuwe lijst',
            createdBy: 'Aangemaakt door: {{creator}}',
            itemName: 'Product',
            deleteListTitle: 'Verwijder \'{{listName}}\'',
            deleteListText: 'Weet je zeker dat je deze lijst wilt verwijderen?',
            items: 'Producten'
        },
        groups: {
            yourGroups: 'Jouw groepen',
            newGroup: 'Nieuwe group',
            deleteGroup: 'Groep verwijderen'
        },
        profile: {
            title: 'Profiel',
            displayName: 'Weergave naam',
            updateProfile: 'Profiel updaten'
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: store.getState().settings.language,
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false
    }
});

export default i18n;
