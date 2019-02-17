import { SET_USER, POST_AUTH, GET_USER, SIGN_GITHUB,  REG_SUC, REG_FAIL, LOG_FAIL} from '../actions/';


const initialState = {
    authError: null,
    isAuthenticated: false,
    token: null,
    user: [],
    getToken: null
    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
        console.log(action.payload);
            return ({
                ...state,
                user:action.user,
                token: action.payload,
                isAuthenticated: true
            });
        case LOG_FAIL:
            return({
                ...state,
                authError:action.err.response.data
            });
        case GET_USER:
            return({
                ...state,
                getToken: action
            });
        case SIGN_GITHUB:
            return({
                ...state,
                token:action.payload
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