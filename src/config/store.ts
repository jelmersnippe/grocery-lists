import {createStore, combineReducers} from 'redux';
import userReducer, {User} from '../reducers/userReducer';

export interface RootState {
    user: User;
}

const rootReducer = combineReducers({user: userReducer});

export default createStore(rootReducer);
