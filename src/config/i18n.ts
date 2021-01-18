import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        common: {
            ok: 'Ok',
            save: 'Save',
            cancel: 'Cancel',
            create: 'Create',
            update: 'Update',
            delete: 'Delete',
            you: 'You'
        },
        auth: {
            email: 'Email',
            password: 'Password',
            login: 'Login',
            toCreateAccount: 'Create an account instead',
            displayName: 'Display name',
            createAccount: 'Create account',
            toLogin: 'Login instead'
        },
        navigation: {
            Groups: 'Groups',
            Lists: 'Lists',
            Search: 'Search',
            ListOverview: 'Your lists',
            GroupOverview: 'Your groups',
            App: 'Back to app',
            Profile: 'Profile',
            Logout: 'Logout'
        },
        lists: {
            title: 'Your lists',
            newList: 'New list',
            createdBy: 'Created by: {{creator}}',
            itemName: 'Item',
            deleteListTitle: 'Delete \'{{listName}}\'',
            deleteListText: 'Are you sure you want to delete this list?',
            users: 'Users'
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
            Logout: 'Uitloggen'
        },
        lists: {
            title: 'Jouw lijsten',
            newList: 'Nieuwe lijst',
            createdBy: 'Aangemaakt door: {{creator}}',
            itemName: 'Product',
            deleteListTitle: 'Verwijder \'{{listName}}\'',
            deleteListText: 'Weet je zeker dat je deze lijst wilt verwijderen?',
            users: 'Gebruikers'
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false
    }
});

export default i18n;
