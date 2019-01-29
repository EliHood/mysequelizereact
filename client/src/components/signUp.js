import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
class signUp extends Component{

    constructor(props){
        super(props)

        this.state = {
            username:"",
            password: "",
            email:"",
            regSuccess: false
        }

        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange = (e) =>{
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });

    }


    handleSubmit = () => {

        this.setState({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,

        });
        axios.post('http://localhost:3000/users/new',{
            username: this.state.username,
            password: this.state.password,
            email: this.state.email, 

        }).then ( (res) => { 
                console.log('success')
    
        }).catch( err => console.log(err))
        
    }

    render(){
        return (
            <div style={ {padding: '20px 100px'}}>
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

export default signUp;