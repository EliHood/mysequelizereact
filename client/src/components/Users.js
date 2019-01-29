import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Styles = {
    myPaper:{
      margin: '20px 0px',
      padding:'20px'
    }
    , 
    wrapper:{
      padding:'0px 60px'
    }
  
  
}

class Users extends Component {

  constructor(props){
    super(props);

    this.state = {
      users: [],
      loading: true,
    }
  }

  getUsers = async () => {

    const url = await fetch('http://localhost:3000/users')
    const json = await url.json();

    this.setState({
      users: json,
      loading: false
    })
    
    console.log(this.state.users);

  }
  componentWillMount(){

    this.getUsers();

  }


  render() {
    const {loading, users} = this.state;

    if(loading){
      return "loading..."
    }

    return (
      <div className="App" style={Styles.wrapper}>
        <h1> Welcome</h1>

        {users.map( (user, i) => (
          
        <Paper style={Styles.myPaper}>
          <Typography key={i} variant="h6" component="h3">
            {user.firstName}   {user.lastName}
          </Typography>
       
          <Typography component="p">
            {user.email}
          </Typography>
        </Paper>

        ))}
      </div>
    );
  }
}

export default Users;