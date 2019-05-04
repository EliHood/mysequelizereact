import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import signUp from '../auth/signUp';
import signIn from '../auth/signIn';
import Post from '../Post';
import Forgot from '../account/Forgot';
import Home from '../Home';
import Posts from '../Posts';
import Users from '../account/Users';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';
import Dashboard from '../account/dashBoard';
import {connect} from 'react-redux';
import {createBrowserHistory} from 'history';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import Axios from '../../Axios';
import updatePassword from '../account/updatePassword';
import ResetPassword from '../account/ResetPassword';
import ourStyles from '../../styles/ourStyles';
export const history = createBrowserHistory({forceRefresh: true});


const logout = (e) => {
    e.preventDefault()
    Axios.get(process.env.REACT_APP_LOGOUT, {withCredentials: true})
        .then(res => {
            // console.log(res);
            if (res.status === 200) {
                localStorage.removeItem('auth')
                localStorage.removeItem('myAuth')
                history.push('/')
            }
        })
        .catch(err => {
        //     // their will be an inevitable error, so you would need this for it to work
            localStorage.removeItem('auth')
             localStorage.removeItem('myAuth')
            history.push('/')
         })
}

const Navbar = ({classes, isAuthenticated}) => (

<Router history={history}>

        <div className={classes.navRoot}>

            <AppBar position="static" className={classes.navbar}>
                <Toolbar>

                    <Typography variant="h6" color="inherit">
                        Express Seqeuelize App
                    </Typography>

                    <Typography classcolor="inherit" className={classes.rightt}>

                        {!isAuthenticated && (

                            <Button>
                                <Link to="/" className={classes.rightToolbar}>
                                    Home
                                </Link>
                            </Button>

                        )}
                        {isAuthenticated && (
                            <Button>
                                <Link className={classes.rightToolbar} to="/posts">
                                    Posts
                                </Link>
                            </Button>

                        )}

                        {!isAuthenticated && (

                            <Button>
                                <Link to="/signUp" className={classes.rightToolbar}>
                                    Sign Up
                                </Link>
                            </Button>

                        )}

                        {!isAuthenticated && (

                            <Button>
                                <Link to="/signIn" className={classes.rightToolbar}>
                                    Sign In
                                </Link>
                            </Button>

                        )}

                        {isAuthenticated && (
                            <Button>
                                <Link className={classes.rightToolbar} to="/Post">
                                    New Post
                                </Link>
                            </Button>

                        )}

                        {isAuthenticated && (
                            <Button>
                                <Link to="/dashboard" className={classes.rightToolbar}>
                                    Dashboard
                                </Link>
                            </Button>

                        )}

                        {isAuthenticated && (
                            <Button onClick={logout}>

                                LogOut

                            </Button>
                        )}

                    </Typography>

                </Toolbar>
            </AppBar>
            <Switch>
            <Route exact path="/github" />
            <Route exact path="/signUp" component={signUp}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signIn" component={signIn}/>
            <Route exact path="/Post" component={Post}/>
            <Route exact path="/Posts" component={Posts}/>
            <Route path="/Forgot" component={Forgot}/>
            <Route path="/users" component={Users}/>
            <Route exact path="/logout"/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route path="/test"/>
            <Route path="/reset/:token" component={ResetPassword}/>
            <Route exact path="/updatePassword/:username" component={updatePassword}/>
            </Switch>
        </div>
 </Router>

);

const mapStateToProps = (state) => ({
    token: state.user.getToken, githubAuth: state.user.githubAuth,
    // owl: state.user.owl,
    isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
    //   logIn: (user) => dispatch(logIn(user))

});

Navbar.propTypes = {
    isAuthenticatd: PropTypes.string

}

// export default withStyles(styles)(Navbar);
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(ourStyles))(Navbar);