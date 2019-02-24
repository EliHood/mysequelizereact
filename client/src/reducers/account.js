import {FORGOT, RESET, RESET_FAIL,UPDATEPASS, UPDATEPASS_FAIL,  FORGOT_ERR } from '../actions/';
const initialState = {
    showError: false,
    messageFromServer: null,
    showNullError:null,
    username: null,
    update: null,
    isLoading: false,
    error: false,
    errorMessage: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case FORGOT:
            return ({
                ...state,
                showError:false,
                messageFromServer:'recovery email sent'
            });
        case FORGOT_ERR:
            return({
                ...state,
                showError: true,
                messageFromServer: '',
                showNullError: false,
            });
        case RESET:
            return({
                ...state,
                username:action.creds.username,
                update: false,
                isLoading: false,
                error: false,
            });
        case RESET_FAIL:
            return({
                ...state,
                update: false,
                isLoading: false,
                error: true,
            })
        case UPDATEPASS:
            return({
                ...state,
                update: 'Your password has been successfully reset, please try logging in again',
                error: false
            });
        case UPDATEPASS_FAIL:
            return({
                ...state, 
                update: 'Please Enter An Email' ,
                error: true,
            })
        default:
            return state
    }
}