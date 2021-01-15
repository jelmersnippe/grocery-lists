import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import ListStack from './ListStack';
import GroupStack from './GroupStack';

export type AppTabsParamList = {
    Lists: undefined;
    Groups: undefined;
    Search: undefined;
}

const Tabs = createBottomTabNavigator<AppTabsParamList>();

const AppTabs = () => {
    return (
        <Tabs.Navigator
            initialRouteName={'Lists'}
        >
            <Tabs.Screen name='Groups' component={GroupStack}/>
            <Tabs.Screen name='Lists' component={ListStack}/>
            <Tabs.Screen name='Search' component={Search}/>
        </Tabs.Navigator>
    );
};

export default AppTabs;
