import React, { Component } from 'react';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
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

  // async componentDidMount() {
  //   let accessString = localStorage.getItem('JWT');
  //   // console.log(accessString);
  //   if (accessString == null) {
  //     this.setState({
  //       isLoading: false,
  //       error: true,
  //     });
  //   } else {
  //     await axios
  //       .get('http://localhost:3000/api/users/findUser', {
  //         params: {
  //           username: this.props.match.params.username,
  //         },
  //         headers: { Authorization: `JWT ${accessString}` },
  //       })
  //       .then(response => {
  //         this.setState({
  //           email: response.data.email,
  //           username: response.data.username,
  //           password: response.data.password,
  //           isLoading: false,
  //           error: false
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error.response.data);
  //         this.setState({
  //           error: true,
  //         });
  //       });
  //   }

  
    
  // }




  componentWillMount(){
    // console.log(this.state.token);
  }

  
  render() {
    // const {token} = this.state;

    // if(!token){

    //   return(
    //     <Redirect to="/signin"/>
    //   )
     
    // }
   
    return (
      <div className="App" style={Styles.wrapper}>
        <h1> Welcome</h1>

    
     
      </div>
    );
  }
}

export default Dashboard;