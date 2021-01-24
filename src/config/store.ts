import {createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'lists', 'groups', 'userCache', 'settings']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export {
    store,
    persistor
};
