import axios from 'axios';
import { history } from '../components/Navbar';

export const SET_USER = "SET_USER";
export const lOG_FAIL = "lOG_FAIL";

export const REG_SUC = "REG_SUCCESS";
export const REG_FAIL = "REG_FAIL";

export const POST_SUCC = "POST_SUCC";
export const POST_FAIL = "POST_FAIL";

export const LOGOUT = "LOGOUT";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const logIn =  (user) => { 
    return (dispatch) => {
        axios.post('/api/users/loginUser',{
            username: user.username,
            password: user.password
        }).then( (res) => {
            localStorage.setItem('JWT', res.data.token);
            history.push('/dashboard');
            dispatch({type: SET_USER, user});
        }).catch((err)=> {
            dispatch({type:  lOG_FAIL, err});
            console.log(err.response.data); // not even showing err console.
        })
        
    }
}

export const register = (user) => { 
    return (dispatch) => {
        axios.post('/api/users/new',{
            username: user.username,
            password: user.password,
            email: user.email 
        }).then( (res) => {
            // console.log('success')
            history.push('/signIn');
            dispatch({type: REG_SUC, user});
        }).catch((err)=> {
            dispatch({type:  REG_FAIL, err});
            console.log(err.response.data); // shows console.log for this though.
        })
        
    }
}
// const config = {
//     auth: true,
//     headers: {
//       'Content-Type': 'application/json',
//     },
// };

export const newPost = (post, req) => { 
    return (dispatch) => {
        axios.post('/api/posts/newPost' ,{
            title: post.title,
            post_content: post.postContent
        }).then( (res) => {
            // console.log('success')
            // history.push('/dashboard');
            dispatch({type: POST_SUCC, post});
        }).catch((err)=> {
            dispatch({type:  POST_FAIL, err});
            console.log(err.response.data); // shows console.log for this though.
        })
        
    }
}