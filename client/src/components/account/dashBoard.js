import React, { Component } from 'react';
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
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      isLoading: true,
      deleted: false,
      error: false,
    }
  }



  componentWillMount(){

  }

  
  render() {
 
   
    return (
      <div className="App" style={Styles.wrapper}>
        <h1> Welcome</h1>

    
     
      </div>
    );
  }
}

export default Dashboard;