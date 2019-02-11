import React, { Component } from 'react';
// import axios from 'axios';
import Navbar from './components/Navbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { getUser} from './actions/';
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

  this.props.getUser();
}
  


  render() {

    const { classes, token } = this.props;

 
    return (
      
      <div className="App">

        <Navbar />

      

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.getToken
})

const mapDispatchToProps = (dispatch) => ({
  //   logIn: (user) => dispatch(logIn(user))
  getUser: () => dispatch( getUser())

});


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(App);
