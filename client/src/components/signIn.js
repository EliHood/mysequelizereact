import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect, browserHistory } from 'react-router-dom'
import { history } from '../components/Navbar';
class signIn extends Component{

    constructor(props){
        super(props)

        this.state = {
            username:"",
            password: "", 
            loggedEmail:"",
            loginError: "",    
            userLoggedIn: false,
            emailBlank: true,
            passwordBlank: true,
            emailInvalid: false,
            passwordInValid: false,
            token:localStorage.getItem('JWT')
        }

        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange = (e) =>{
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });

    }


    handleSubmit = (e) => {
        
        e.preventDefault();
        this.setState({
            username: this.state.username, 
            password: this.state.password
 

        });

        axios.post('/api/users/loginUser',{
            username: this.state.username, 
            password: this.state.password
            

        }).then ( res => { 
        
            localStorage.setItem('JWT', res.data.token);
            // console.log(this.state.token)
            history.push('/dashboard');
    
        }).catch( err => console.log(err))

        

    }

    render(){
        const { token} = this.state;
        if(token){
            return <Redirect to='/dashboard'/>
        }
        return (
            <div style={ {padding: '20px 100px'}}>
            <h1>Sign In</h1>
            <form onSubmit={this.handleSubmit}>      
                <TextField
                    id="outlined-name2"
                    label="Username"
                    className=""
                    style={{width: 560}}
                    name="username"
                    value={this.state.email}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />  
                <br></br>
                <TextField
                    id="outlined-name"
                    label="Password"
                    name="password"
                    type="password"
                    style={{width: 560}}
                    className=""
                    value={this.state.password}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />  

                <br></br>

                <button type="submit"> Submit </button>

            </form>

            </div>

        );
    }

    



}

export default signIn;