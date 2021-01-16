import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './config/store';
import AppContainer from './navigators/AppContainer';
import {PersistGate} from 'redux-persist/integration/react';
import {Overlay, OverlayContextProvider} from '@jelmersnippe/flexible-overlays';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <OverlayContextProvider>
                    <NavigationContainer>
                        <AppContainer/>
                    </NavigationContainer>
                    <Overlay/>
                </OverlayContextProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
