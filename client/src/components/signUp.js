import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
class signUp extends Component{

    constructor(props){
        super(props)

        this.state = {
            firstName:"",
            lastName: "",
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,

        });
        axios.post('http://localhost:3000/users/new',{
            firstName: this.state.firstName,
            lastName: this.state.lastName,
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
                    label="First Name"
                    style={{width: 560}}
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
            <br></br>
                <TextField
                    id="outlined-name"
                    label="Last Name"
                    className=""
                    style={{width: 560}}
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />  
                <br></br>
                <TextField
                    id="outlined-name"
                    label="Email"
                    name="email"
                    style={{width: 560}}
                    className=""
                    value={this.state.email}
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