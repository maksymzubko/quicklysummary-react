import {combineReducers} from 'redux';
import userSlice from './user/slice';
import managerSlice from './manager/slice';

export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        user: userSlice,
        manager: managerSlice,
        ...injectedReducers
    });

    return rootReducer;
}
