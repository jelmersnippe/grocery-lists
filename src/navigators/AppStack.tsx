import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

export type AppStackParamList = {
    Home: undefined;
}

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};

export default AppStack;
