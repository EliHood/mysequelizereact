import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
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


export default class ResetPassword extends Component {
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
    axios
      .put('/api/users/updatePasswordViaEmail', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        console.log(response.data);
        if (response.data.message === 'password updated') {
          this.setState({
            updated: true,
            error: false,
          });
        } else {
          this.setState({
            updated: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <AppBar title={title} />
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
       
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    } else {
      return (
        <div className="App" style={Styles.wrapper}>
         <h1> Update Password</h1>

         {updated && (
            <div>
              <p>
                Your password has been successfully reset, please try logging in
                again.
              </p>
            
            </div>
          )}
      
          <form className="password-form" onSubmit={this.updatePassword}>
            <TextField
              id="password"
              label="password"
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
}