import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import groupsReducer from './groups/reducer';
import listsReducer from './lists/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    groups: groupsReducer,
    lists: listsReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
