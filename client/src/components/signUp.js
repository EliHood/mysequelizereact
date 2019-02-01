import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import {register} from  '../actions/';
import { Redirect, withRouter } from 'react-router-dom';
class signUp extends Component{

    constructor(props){
        super(props)

        this.state = {
            formData:{
                username:"",
                password: "",
                passwordConf:"",
                email:""
            },
            passErr: "",
            regSuccess: false
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
        const {username, email, password, passwordConf} = formData;
        this.setState({
            username: this.state.username, 
            password: this.state.password,
            passwordConf: this.state.passwordConf,
            email:this.state.email,
 

        });
        
        const creds = {
            username, email, password
        }
        if(password === passwordConf){
            this.props.register(creds);
        }

        else{
            this.setState({
                passErr: "Passwords Don't Match"
            })
        }
       

    }

    render(){
      const {token } = this.props
        if(token){
            return <Redirect to='/dashboard'/>
        }
  
        return (
            <div style={ {padding: '20px 100px'}}>

            {this.props.error && (
                    <div style={{color:'red'}}>
                        {this.props.error}
                    </div>            
            )}

            {this.state.passErr && (
                    <div style={{color:'red'}}>
                        {this.state.passErr}
                    </div>            
            )}
            
            
            <h1>Sign Up</h1>
      
            <form onSubmit={this.handleSubmit}>      
                <TextField
                    id="outlined-name"
                    label="Username"
                    style={{width: 560}}
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
            <br></br>
                <TextField
                    id="outlined-name"
                    label="Email"
                    className=""
                    style={{width: 560}}
                    name="email"
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
              <TextField
                    id="outlined-name"
                    label="Confirm Password"
                    name="passwordConf"
                    type="password"
                    style={{width: 560}}
                    className=""
                    value={this.state.passwordConf}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />  

                <br></br>

                <Button variant="outlined" color="primary" type="submit">
                    Sign Up
                </Button>

            </form>

            </div>

        );
    }

    



}

const mapStateToProps = (state) => ({
    token: state.user.getToken,
    error: state.user.authError
})
  
const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(register(user))
  
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(signUp));