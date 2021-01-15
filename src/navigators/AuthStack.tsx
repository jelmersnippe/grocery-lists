import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';

export type AuthStackParamList = {
    Login: undefined;
    CreateAccount: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='CreateAccount' component={CreateAccount}/>
        </Stack.Navigator>
    );
};

export default AuthStack;
