import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import signUp from './signUp';
import signIn from './signIn';
import Post from './Post';
import Forgot from './Forgot';
import Posts from './Posts';
import Users from './Users';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';
import Dashboard from './dashBoard';
import {connect} from 'react-redux';
import {createBrowserHistory} from 'history';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import axios from 'axios';
import updatePassword from './updatePassword';
import ResetPassword from './ResetPassword';
export const history = createBrowserHistory({forceRefresh: true});

const styles = {
    // This group of buttons will be aligned to the right

    rightToolbar: {
        color: '#fff',
        textDecoration: 'none',
        a: {
            color: '#fff'

        }
    },
    rightt: {
        marginLeft: 'auto',
        marginRight: 24
    },
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: 16,
        marginLeft: -12
    }
};

const logout = () => {
    // e.preventDefault();
    axios.get('/api/users/logout');
    localStorage.removeItem('JWT');
    history.push('/');

};

const Navbar = ({classes, token}) => (

    <Router history={history}>
        <div className={classes.root}>

            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Eli App
                    </Typography>
                    <Typography classcolor="inherit" className={classes.rightt}>

                        {token && (
                            <Button>
                                <Link className={classes.rightToolbar} to="/posts">
                                    Posts
                                </Link>
                            </Button>

                        )}

                        {!token && (

                            <Button>
                                <Link to="/signUp" className={classes.rightToolbar}>
                                    Sign Up
                                </Link>
                            </Button>

                        )}
                        {!token && (

                            <Button>
                                <Link to="/signIn" className={classes.rightToolbar}>
                                    Sign In
                                </Link>
                            </Button>

                        )}

                        {token && (
                            <Button>
                                <Link className={classes.rightToolbar} to="/Post">
                                    New Post
                                </Link>
                            </Button>

                        )}


                        {token && (
                            <Button>
                                <Link to="/dashboard" className={classes.rightToolbar}>
                                    Dashboard
                                </Link>
                            </Button>

                        )}

                        {token && (
                            <Button onClick={logout}>
                                <Link className={classes.rightToolbar} to={'/logout'}>
                                    LogOut
                                </Link>
                            </Button>

                        )}

                    </Typography>

                </Toolbar>
            </AppBar>

            <Route path="/signUp" component={signUp}/>
            <Route path="/signIn" component={signIn}/>
            <Route path="/Post" component={Post}/>
            <Route path="/Posts" component={Posts}/>
            <Route path="/Forgot" component={Forgot}/>
            <Route path="/users" component={Users}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/logout"/>
            <Route path="/reset/:token" component={ResetPassword}/>
            <Route exact path="/updatePassword/:username" component={updatePassword}/>
        </div>
    </Router>

);

const mapStateToProps = (state) => ({token: state.user.getToken})

const mapDispatchToProps = (dispatch) => ({
    //   logIn: (user) => dispatch(logIn(user))

});

Navbar.propTypes = {
    token: PropTypes.string

}

// export default withStyles(styles)(Navbar);
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Navbar);