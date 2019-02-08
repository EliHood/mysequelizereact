import authReducer from './users';
import postReducer from './posts';
import accountReducer from './account';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    user: authReducer,
    post: postReducer,
    account: accountReducer
})

export default rootReducer;