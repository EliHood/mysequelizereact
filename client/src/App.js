import React, { Component } from 'react';
// import axios from 'axios';
import Navbar from './components/layout/Navbar';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { getUser, setCurrentUser} from './actions/';
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';
import ourStyles from './styles/ourStyles';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
  
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
    this.props.getUser();
    console.log(this.props.current_user);
}

componentDidUpdate(){
  // const currentUser = localStorage.getItem('myAuth');
  console.log(this.props.current_user);
}
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  current_user: state.user.current_user
})
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch (getUser()),
  setCurrentUser: () => dispatch( setCurrentUser()),
});
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(ourStyles))(App);
