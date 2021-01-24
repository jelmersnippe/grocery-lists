import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListStack from './ListStack';
import GroupStack from './GroupStack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import Text from '../components/Text';
import theme from '../config/theme';

export type AppTabsParamList = {
    Lists: undefined;
    Groups: undefined;
}

const Tabs = createBottomTabNavigator<AppTabsParamList>();

const AppTabs = () => {
    const {t} = useTranslation('navigation');

    return (
        <Tabs.Navigator
            initialRouteName={'Lists'}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    const color = focused ? theme.colors.blue : theme.colors.grayDark;
                    switch (route.name) {
                        case 'Groups':
                            return <Icon name={'people'} size={30} color={color}/>;
                        case 'Lists':
                            return <Icon name={'list'} size={30} color={color}/>;
                    }
                },
                tabBarLabel: ({focused}) => {
                    const color = focused ? theme.colors.blue : theme.colors.grayDark;
                    return <Text style={{color}}>{t(route.name)}</Text>;
                }
            })}
        >
            <Tabs.Screen name='Groups' component={GroupStack}/>
            <Tabs.Screen name='Lists' component={ListStack}/>
        </Tabs.Navigator>
    );
};

export default AppTabs;
