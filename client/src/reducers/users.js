import { SET_USER } from '../actions/';

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
        


        default:
            return state
    }
}