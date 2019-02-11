import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { updatePass, Reset} from '../../actions';
const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Password Reset Screen',
};
const Styles = {
  myPaper: {
      margin: '20px 0px',
      padding: '20px'
  },
  wrapper: {
      padding: '0px 60px'
  },

  textF: {
      width: '500px'
  }

}


class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      update: false,
      isLoading: true,
      error: false,
    };
  }

async componentDidMount() {

  // this.props.Reset();
    await axios
      .get('/api/users/reset', {
        params: {
          resetPasswordToken: this.props.match.params.token,
        },
      })
      .then(response => {
        console.log(response);
        if (response.data.message === 'password reset link a-ok') {
          this.setState({
            username: response.data.username,
            update: false,
            isLoading: false,
            error: false,
          });
        }
      })
      .catch(error => {
        console.log(error.response.data);
        this.setState({
          update: false,
          isLoading: false,
          error: true,
        });
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = e => {
    e.preventDefault();
    const {username, password} = this.state;

    const creds = {
      username, password
    }

  
    this.props.updatePass(creds);
    
   
   
    // axios
    //   .put('/api/users/updatePasswordViaEmail', {
    //     username: this.state.username,
    //     password: this.state.password,
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     if (response.data.message === 'password updated') {
    //       this.setState({
    //         updated: true,
    //         error: false,
    //       });
    //     } else {
    //       this.setState({
    //         updated: false,
    //         error: true,
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error.data);
    //   });
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

  
      return (
        <div className="App" style={Styles.wrapper}>
         <h1> Update Password</h1>

         {this.props.updated && (
            <div>
              <p>
              {this.props.updated}
              </p>
            
            </div>
          )}
     
          <form className="password-form" onSubmit={this.updatePassword}>
            <TextField
              id="Password"
              label="Password"
              style={Styles.textF}
              onChange={this.handleChange('password')}
              value={password}
              type="password"
            />
          <br></br>
          <br></br>
          <Button color="primary" variant="outlined" type="submit">
            Update Password
         </Button>
          </form>

         
        </div>
      );
    }
  }


const mapStateToProps = (state) => ({

  updated: state.account.update,
  isLoading: state.account.isLoading



})
const mapDispatchToProps = (dispatch) => ({
  Reset: () => dispatch(Reset()),
  updatePass: (creds) => dispatch(updatePass(creds))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));