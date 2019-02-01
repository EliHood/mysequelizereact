import axios from 'axios';
import { history } from '../components/Navbar';

export const SET_USER = "SET_USER";
export const logIn_FAIL = "logIn_FAIL";

export const REG_SUC = "REG_SUCCESS";
export const REG_FAIL = "REG_FAIL";

export const logIn = (user) => { 
    return (dispatch) => {
        axios.post('/api/users/loginUser',{
            username: user.username,
            password: user.password
        }).then( (res) => {
            localStorage.setItem('JWT', res.data.token);
            history.push('/dashboard');
            dispatch({type: SET_USER, user, payload:res.data.token});
            console.log(res.data.token)
        }).catch( (err)=> {
            dispatch({type: logIn_FAIL, err});
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
            console.log(err.response.data);
        })
        
    }
}