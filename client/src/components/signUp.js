import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect} from 'react-router-dom'
class signUp extends Component{

    constructor(props){
        super(props)

        this.state = {
            username:"",
            password: "",
            email:"",
            token:localStorage.getItem('JWT'),
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
            email: this.state.email

        });
        axios.post('/api/users/new',{
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 

        }).then ( (res) => { 
                console.log('success')
    
        }).catch( err => console.log(err))
        
    }

    render(){
        const {token} = this.state;
        if(token){
            return <Redirect to='/dashboard'/>
        }
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
                    Sign Up
                </Button>

            </form>

            </div>

        );
    }

    



}

export default signUp;