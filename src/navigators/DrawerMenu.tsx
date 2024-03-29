import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import auth from '@react-native-firebase/auth';
import {resetUser} from '../reducers/user/actions';
import {store} from '../config/store';
import {useTranslation} from 'react-i18next';
import {resetGroups} from '../reducers/groups/actions';
import {resetLists} from '../reducers/lists/actions';
import ListStack from './ListStack';

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
            <DrawerItem
                label={t('Logout')}
                onPress={async () => {
                    props.navigation.closeDrawer();
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
                component={ListStack}
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
