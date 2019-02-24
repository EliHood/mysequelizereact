import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
// import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'
// import { history } from '../components/Navbar';
import {connect} from 'react-redux';
import {logIn} from '../../actions/';
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import ourStyles from '../../styles/ourStyles';

const MyLink = props => <Link to="/Forgot" {...props}/>
class signIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                username: "",
                password: ""
            },
            loggedEmail: "",
            loginError: "",
            myToken: "",
            userLoggedIn: false,
            emailBlank: true,
            passwordBlank: true,
            emailInvalid: false,
            passwordInValid: false,
            // token:localStorage.getItem('JWT')
        }
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }
    handleChange = (e) => {
        e.preventDefault();
        const {formData} = this.state;
        this.setState({
            formData: {
                ...formData,
                [e.target.name]: e.target.value
            }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {formData} = this.state;
        const {username, password} = formData;
        const creds = {
            username,
            password
        }
        this
            .props
            .logIn(creds);
        console.log(creds);
    }
    render() {
        const {classes} = this.props;
        if (this.props.isAuthenticated) {
            return (<Redirect to="/dashboard"/>);
        }
        return (
            <Grid container spacing={44}>
                <Grid item sm={7}>
                    <div
                        style={{
                        padding: '20px 100px'
                    }}>
                        {this.props.error && (
                            <div
                                style={{
                                color: 'red'
                            }}>
                                {this.props.error}
                            </div>
                        )}
                        <h1>Sign In</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Grid item sm={10}>
                                <TextField
                                    id="outlined-name2"
                                    label="Username"
                                    className=""
                                    style={{
                                    width: '100%'
                                }}
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"/>
                                <br></br>
                                <TextField
                                    id="outlined-name"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    style={{
                                    width: '100%'
                                }}
                                    className=""
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"/>
                                <br></br>
                                <Button variant="outlined" color="primary" type="submit">
                                    Log In
                                </Button>
                                <Button
                                    component={MyLink}
                                    variant="outlined"
                                    type="submit"
                                    className={classes.button}>
                                    Forgot Password ?
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.getToken, 
    isAuthenticated: state.user.isAuthenticated,
    error: state.user.authError
});
const mapDispatchToProps = (dispatch) => ({
    logIn: (user) => dispatch(logIn(user))
});
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(ourStyles))(signIn);