import { POST_FAIL, GET_POSTS,  ADD_LIKE, EDIT_CHANGE, POST_SUCC, DELETE_POST,UPDATE_POST} from '../actions/';

const initialState = {
    post: [],
    postError: null,
    posts:[],
    isEditing:false,
    isEditingId:null,
    likes:[],
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
        console.log(action.data)
        // console.log(action.id)
        //  const owl =  action.data.filter((post) => action.id.includes(post.id)).map((a) => {
        //     return { postlikes: a.Likes.length }
        // })
        // console.log(owl)
        // const filtered = action.data.filter((post) => action.id.includes(post.id))
        const filtered = action.data.filter((post) => action.id.includes(post.id))
        // console.log( filtered.map((post) => post.Likes.length))
            return {
                ...state, 
                posts: action.data, // maps posts fine,
                likes: filtered.map((post) => post.Likes.length)

        }
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
  
        case ADD_LIKE:
            const newState = {...state};  // here I am trying to shallow  copy the existing state;
            const existingLikesOfPost = newState.posts.find(post => post.id === action.id).Likes;
            newState.posts.find(post => post.id === action.id).Likes = [...existingLikesOfPost, action.newLikeObject]; // using this approach I got some code duplication so I suggested the first approach of using **push** method of array.
            // console.log(newState)
            return newState    
        default:
            return state
    }
}