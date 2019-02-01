import { SET_USER, REG_SUC, REG_FAIL} from '../actions/';



const initialState = {
    authError: null,
    isAuthenticated: false,
    token: null,
    user: [],
    getToken: localStorage.getItem('JWT')
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return ({
                ...state,
                user:action.user,
                token: action.payload,
                isAuthenticated: true
            })
        case REG_SUC:
            return({
                ...state,
                user:action.user,
                isAuthenticated:true,
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