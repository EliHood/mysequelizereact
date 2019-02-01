import axios from 'axios';
import { history } from '../components/Navbar';

export const SET_USER = "SET_USER";
export const logIn_SUCCESS = "logIn_SUCCESS";
export const logIn_FAIL = "logIn_FAIL";

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