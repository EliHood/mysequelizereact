import { SET_USER,  GET_CURRENT_USER, GET_USER,  REG_SUC, REG_FAIL, LOG_FAIL} from '../actions/';


const initialState = {
    authError: null,
    isAuthenticated:localStorage.getItem('auth'),
    token: null,
    user: [],
    isAuthenticated2:[],
    redirectPath: null
    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
        console.log(action.payload);
        console.log(action.isAuthenticated)
            return ({
                ...state,
                user:action.user,
                token: action.payload,
                isAuthenticated:action.isAuthenticated
            });
            
        case LOG_FAIL:
            return({
                ...state,
                authError:action.err.response.data 
            });
        
        case GET_USER:
            return({
                ...state,
      
            });  
        case GET_CURRENT_USER:
            return({
                ...state,
                current_user: action.data
            
            })
        case REG_SUC:
            return({
                ...state,
                user:action.user,
                token: action.payload
            });
        case REG_FAIL:
            return({
                ...state,
                authError:action.err.response.data
            });

    
        default:
            return state
    }
}