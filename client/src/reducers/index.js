import authReducer from './users';
import postReducer from './posts';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    user: authReducer,
    post: postReducer
})

export default rootReducer;