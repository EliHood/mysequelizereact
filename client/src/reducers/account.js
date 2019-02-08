import {FORGOT,  FORGOT_ERR } from '../actions/';

const initialState = {
    showError: false,
    messageFromServer: null,
    showNullError:null
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
  
        default:
            return state
    }
}