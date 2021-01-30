import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './config/store';
import AppContainer from './navigators/AppContainer';
import {PersistGate} from 'redux-persist/integration/react';
import {Overlay, OverlayContextProvider} from '@jelmersnippe/flexible-overlays';
import i18n from './config/i18n';
import {I18nextProvider} from 'react-i18next';

const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <OverlayContextProvider>
                        <NavigationContainer>
                            <AppContainer/>
                        </NavigationContainer>
                        <Overlay
                            wrapperStyle={{width: '80%'}}
                        />
                    </OverlayContextProvider>
                </PersistGate>
            </Provider>
        </I18nextProvider>
    );
};

export default App;
