import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './config/store';
import AppContainer from './navigators/AppContainer';

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppContainer />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
