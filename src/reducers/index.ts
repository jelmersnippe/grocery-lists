import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import groupsReducer from './groups/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    groups: groupsReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
