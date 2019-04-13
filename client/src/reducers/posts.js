import { POST_FAIL, POST_SUCC, DELETE_POST} from '../actions/';

const initialState = {
    post: [],
    postError: null,
    posts:[]
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

        case DELETE_POST:
            return ({
                ...state,
               posts: state.posts.filter(post=> post.id !== action.id)
            })
        default:
            return state
    }
}