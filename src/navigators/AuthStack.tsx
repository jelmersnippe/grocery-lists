import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import {Header} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';
import Text from '../components/Text';
import {useTranslation} from 'react-i18next';

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
                header: ({scene, previous, navigation}) => {
                    return (
                        <Header
                            leftComponent={previous && (
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Icon name={'arrow-back'} color={theme.colors.white} size={26}/>
                                </TouchableOpacity>
                            )}
                            centerComponent={<Text style={theme.headerText}>{t(scene.route.name)}</Text>}
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
