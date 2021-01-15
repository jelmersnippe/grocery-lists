import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './config/store';
import AppContainer from './navigators/AppContainer';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <AppContainer/>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
