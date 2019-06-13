import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {register} from '../../actions/';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import ourStyles from '../../styles/ourStyles';
class signUp extends Component {
        state = {
            formData: {
                username: "",
                password: "",
                passwordConf: "",
                email: ""
            },
            passErr: "",
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
        const {username, email, password, passwordConf} = formData;
        this.setState({
            username: this.state.username,
            password: this.state.password,
            passwordConf: this.state.passwordConf,
            email: this.state.email
        });
        const creds = {
            username,
            email,
            password
        }
        if (password === passwordConf) {
            this.props.register(creds);
        } else {
            this.setState({passErr: "Passwords Don't Match"})
        }
    }
    render() {
        const {isAuthenticated, classes} = this.props
        if (isAuthenticated) {
            return <Redirect to='/dashboard'/>
        }
        return (
            <Grid justify="center" container >
                <Grid item xs={12} sm={10} md={5} >
                    <div className={classes.signUp}>
                        {this.props.error && (
                            <div
                                style={{
                                color: 'red'
                            }}>
                                {this.props.error}
                            </div>
                        )}
                        {this.state.passErr && (
                            <div
                                style={{
                                color: 'red'
                            }}>
                                {this.state.passErr}
                            </div>
                        )}
                        <h1>Sign Up</h1>
                        <form onSubmit={this.handleSubmit}>
                                <TextField
                                    label="Username"
                                    style={{width: '100%' }}
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"/>
                                <br></br>
                                <TextField
                                    label="Email"
                                    className=""
                                    style={{width: '100%' }}
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"/>
                                <br></br>
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    style={{width: '100%' }}
                                    className=""
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"/>
                                    
                                <br></br>
                                <TextField
                                    label="Confirm Password"
                                    name="passwordConf"
                                    type="password"
                                    style={{width: '100%' }}
                                    className=""
                                    value={this.state.passwordConf}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"/>
                                <br></br>
                                <Button m={2}variant="outlined" color="primary" type="submit">
                                    Sign Up
                                </Button>
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
})
const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(register(user))
});
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(ourStyles))(signUp);