import authReducer from './users';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    user: authReducer
})

export default rootReducer;