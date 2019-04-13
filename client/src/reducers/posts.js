import { POST_FAIL, GET_POSTS, POST_SUCC, DELETE_POST} from '../actions/';

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
        case GET_POSTS:
            // console.log(action.data)
            return {...state, posts: action.data}
        case DELETE_POST:
            // console.log(state.posts) gets posts from posts initialState so we can iterate and delete post
            return ({
                ...state,
                // action.id refers to the id from the DeletePost Actions
               posts: state.posts.filter(post => post.id !== action.id) 
            })
        default:
            return state
    }
}