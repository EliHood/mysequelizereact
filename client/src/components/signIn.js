import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
class signIn extends Component{

    constructor(props){
        super(props)

        this.state = {
            email:"",
            password: "", 
            loggedEmail:"",
            loginError: "",    
            userLoggedIn: false,
            emailBlank: true,
            passwordBlank: true,
            emailInvalid: false,
            passwordInValid: false,
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
        e.preventDefault()
        
        this.setState({
            email: this.state.email, 
            password: this.state.password
 

        });

        if (!this.state.emailBlank && !this.state.passwordBlank){
            axios.post('/api/users/login',{
                email: this.state.email, 
                password: this.state.password
                

            }).then ( res => { 
                if (res.data.incorrectEmail|| res.data.incorrectPassword ){
                    this.setState({ loginError: res.data.msg})
                }
                this.setState({ userLoggedIn: res.data.inSession, loggedEmail: res.data.loggedEmail})
        
            }).catch( err => console.log(err))

        }else{
            this.setState({ emailInvalid: true, passwordInValid: true})

            console.log(  this.state.emailInvalid, this.state.passwordInValid)
        }
        

    }

    render(){
        return (
            <div style={ {padding: '20px 100px'}}>
            <h1>Sign In</h1>
            <form onSubmit={this.handleSubmit}>      
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

                <button type="submit"> Submit </button>

            </form>

            </div>

        );
    }

    



}

export default signIn;