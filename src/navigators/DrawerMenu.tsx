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

export type DrawerMenuParamList = {
    App: undefined;
    Profile: undefined;
}

const Drawer = createDrawerNavigator<DrawerMenuParamList>();

const DrawerMenuItems = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label='Logout'
                onPress={async () => {
                    await auth().signOut();
                }}
            />
        </DrawerContentScrollView>
    );
};

const DrawerMenu = () => {
    return (
        <Drawer.Navigator
            drawerPosition={'right'}
            drawerType={'slide'}
            drawerContent={(props) => <DrawerMenuItems {...props} />}
        >
            <Drawer.Screen name='App' component={AppTabs}/>
            <Drawer.Screen name='Profile' component={Profile}/>
        </Drawer.Navigator>
    );
};

export default DrawerMenu;
