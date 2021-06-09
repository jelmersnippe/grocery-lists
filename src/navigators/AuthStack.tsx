import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import {useTranslation} from 'react-i18next';
import CustomHeader from '../components/Header';

export type AuthStackParamList = {
    Login: undefined;
    CreateAccount: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    const {t} = useTranslation('navigation');

    return (
        <Stack.Navigator
            screenOptions={{
                header: ({scene, previous}) => {
                    return (
                        <CustomHeader
                            title={t(scene.route.name)}
                            showBackButton={!!previous}
                            showDrawerButton={false}
                        />
                    );
                }
            }}
        >
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='CreateAccount' component={CreateAccount}/>
        </Stack.Navigator>
    );
};

export default AuthStack;
