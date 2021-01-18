import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import AppTabs from './AppTabs';
import Profile from '../screens/Profile';
import auth from '@react-native-firebase/auth';
import {resetUser} from '../reducers/user/actions';
import {store} from '../config/store';
import {useTranslation} from 'react-i18next';
import {resetGroups} from '../reducers/groups/actions';
import {resetLists} from '../reducers/lists/actions';
import {resetUserCache} from '../reducers/userCache/actions';

export type DrawerMenuParamList = {
    App: undefined;
    Profile: undefined;
}

const Drawer = createDrawerNavigator<DrawerMenuParamList>();

const DrawerMenuItems = (props: DrawerContentComponentProps) => {
    const {t} = useTranslation('navigation');

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {
                __DEV__ &&
                <DrawerItem
                    label={t('Clear user cache')}
                    onPress={() => store.dispatch(resetUserCache())}
                />
            }
            <DrawerItem
                label={t('Logout')}
                onPress={async () => {
                    await auth().signOut();
                    store.dispatch(resetGroups());
                    store.dispatch(resetLists());
                    store.dispatch(resetUser());
                }}
            />
        </DrawerContentScrollView>
    );
};

const DrawerMenu = () => {
    const {t} = useTranslation('navigation');

    return (
        <Drawer.Navigator
            drawerPosition={'right'}
            drawerType={'slide'}
            drawerContent={(props) => <DrawerMenuItems {...props} />}
        >
            <Drawer.Screen
                name='App'
                component={AppTabs}
                options={{drawerLabel: t('App')}}
            />
            <Drawer.Screen
                name='Profile'
                component={Profile}
                options={{drawerLabel: t('Profile')}}
            />
        </Drawer.Navigator>
    );
};

export default DrawerMenu;
