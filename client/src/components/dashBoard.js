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

class Dashboard extends Component {

  constructor(props){
    super(props);

    this.state = {
      users: [],

    }
  }

  g


  render() {

 
    return (
      <div className="App" style={Styles.wrapper}>
        <h1> Welcome</h1>

     
      </div>
    );
  }
}

export default Dashboard;