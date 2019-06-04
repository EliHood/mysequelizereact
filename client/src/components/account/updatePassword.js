import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Update Password Screen',
};

class updatePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loadingUser: false,
      updated: false,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({ loadingUser: true });

    let accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    } else {
      axios
        .get('/api/users/findUser', {
          params: {
            username: this.props.match.params.username,
          },
          headers: { Authorization: `JWT ${accessString}` },
        })
        .then(response => {
          // console.log(response.data);
          this.setState({
            loadingUser: false,
            username: response.data.username,
            password: response.data.password,
            error: false,
          });
        })
        .catch(error => {
          console.log(error.response.data);
          this.setState({
            loadingUser: false,
            error: true,
          });
        });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = e => {
    let accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    } else {
      e.preventDefault();
      axios
        .put(
          '/api/users/updatePassword',
          {
            username: this.state.username,
            password: this.state.password,
          },
          {
            headers: { Authorization: `JWT ${accessString}` },
          },
        )
        .then(response => {
          if (response.data.message === 'password updated') {
            this.setState({
              updated: true,
              error: false,
              loadingUser: false,
            });
          }
        })
        .catch(error => {
          console.log(error.response.data);
          this.setState({
            updated: false,
            error: true,
            loadingUser: false,
          });
        });
    }
  };

  render() {
    const {  password, updated, error, loadingUser } = this.state;

    if (error) {
      return (
        <div>
          <AppBar  title={title} />
          <p style={loading}>
            There was a problem accessing your data. Please go login again.
          </p>
       
        </div>
      );
    } else if (loadingUser !== false) {
      return (
        <div>
          <AppBar  title={title} />
          <p style={loading}>Loading user data...</p>
        </div>
      );
    } else if (loadingUser === false && updated === true) {
      return <Redirect to={'/dashboard'} />;
    } else if (loadingUser === false) {
      return (
        <div>
          <AppBar  title={title} />
          <form className="profile-form" onSubmit={this.updatePassword}>
            <TextField
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              type="password"
            />
        <Button  variant="outlined" type="submit">
            Save Changes
         </Button>
          </form>
      
        </div>
      );
    }
  }
}

export default updatePassword;