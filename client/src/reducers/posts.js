import { POST_FAIL, POST_SUCC} from '../actions/';

const initialState = {
    post: [],
    postError: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_SUCC:
            return ({
                ...state,
                post:action.post
            });

        case POST_FAIL:
            return({
                ...state,
                postError: action.err.response.data
            })
  
        default:
            return state
    }
}