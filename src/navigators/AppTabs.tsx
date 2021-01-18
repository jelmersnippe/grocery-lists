import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import ListStack from './ListStack';
import GroupStack from './GroupStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';

export type AppTabsParamList = {
    Lists: undefined;
    Groups: undefined;
    Search: undefined;
}

const Tabs = createBottomTabNavigator<AppTabsParamList>();

const AppTabs = () => {
    const {t} = useTranslation('navigation');

    return (
        <Tabs.Navigator
            initialRouteName={'Lists'}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    const color = focused ? 'tomato' : 'black';
                    switch (route.name) {
                        case 'Groups':
                            return <Icon name={'people'} size={30} color={color}/>;
                        case 'Lists':
                            return <Icon name={'list'} size={30} color={color}/>;
                        case 'Search':
                            return <Icon name={'search'} size={30} color={color}/>;
                    }
                },
                tabBarLabel: ({focused}) => {
                    const color = focused ? 'tomato' : 'black';
                    return <Text style={{color}}>{t(route.name)}</Text>;
                }
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'black'
            }}
        >
            <Tabs.Screen name='Groups' component={GroupStack}/>
            <Tabs.Screen name='Lists' component={ListStack}/>
            <Tabs.Screen name='Search' component={Search}/>
        </Tabs.Navigator>
    );
};

export default AppTabs;
