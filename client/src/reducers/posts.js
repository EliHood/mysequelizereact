import { POST_FAIL, GET_POSTS, EDIT_POST, DISABLED, EDIT_CHANGE, POST_SUCC, DELETE_POST,UPDATE_POST} from '../actions/';

const initialState = {
    post: [],
    postError: null,
    posts:[],
    isEditing:false,
    isEditingId:null,
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
                // action.id refers to the id from the DeletePost Action
               posts: state.posts.filter(post => post.id !== action.id) 
            })

        case UPDATE_POST:
            return({
                ...state,
                
            })
        case EDIT_CHANGE:
            // console.log(action.id)
            return({
                ...state,
                isEditingId: action.id
            })
  
            
        default:
            return state
    }
}