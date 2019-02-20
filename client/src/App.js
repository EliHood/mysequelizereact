import React, { Component } from 'react';
// import axios from 'axios';
import Navbar from './components/layout/Navbar';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { getUser, setCurrentUser} from './actions/';
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';
import Axios from './Axios';


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  chip: {
    margin: theme.spacing.unit,
  },
});


class App extends Component {

  constructor(props){
    super(props);
     
    this.state = {
      user: "",
      isAuthenticated: false,
    }

}

componentWillMount(){

  if (localStorage.auth != null) {
    // Set auth token header auth
    setAuthToken(localStorage.auth);

    const token = localStorage.getItem('auth');
    // // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // console.log(decoded);
    // // Set user and isAuthenticated
    this.props.setCurrentUser(decoded);

  }








}
  


  render() {

    const { classes, isAuthenticated } = this.props;

 
    return (
      
      <div className="App">

        <Navbar />

  

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,

})

const mapDispatchToProps = (dispatch) => ({

  setCurrentUser: () => dispatch( setCurrentUser()),

});


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(App);
