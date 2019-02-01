import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import axios from 'axios';
import {withRouter, Redirect } from 'react-router-dom'
// import { history } from '../components/Navbar';
import { connect } from 'react-redux';
import {logIn} from  '../actions/';
class signIn extends Component{

    constructor(props){
        super(props)

        this.state = {
            formData:{
                username:"",
                password: ""
            },
            loggedEmail:"",
            loginError: "",
            myToken:"", 
            userLoggedIn: false,
            emailBlank: true,
            passwordBlank: true,
            emailInvalid: false,
            passwordInValid: false,
            // token:localStorage.getItem('JWT')
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange = (e) =>{
        e.preventDefault();

        const { formData } = this.state;

        this.setState({
            formData: {
              ...formData,
              [e.target.name]: e.target.value
            }
        });

    }


    handleSubmit = (e) => {
        
        e.preventDefault();
        const {formData} = this.state;
        const {username, password} = formData;
        this.setState({
            username: this.state.username, 
            password: this.state.password
 

        });

        const creds = {
            username, password
        }
        this.props.logIn(creds);

 

    }

    componentDidMount(){
  
        this.setState({
            myToken: this.props.token
        });

        console.log( this.props.token);
    }

    render(){
  
      
        if( this.props.token){
            return(
                <Redirect to="/dashboard"/>
            );
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

                <Button variant="outlined" color="primary" type="submit">
                    Log In
                </Button>

            </form>

            </div>

        );
    }

    



}


const mapStateToProps = (state) => ({
    token: state.user.getToken
})
  
const mapDispatchToProps = (dispatch) => ({
      logIn: (user) => dispatch(logIn(user))
  
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(signIn));