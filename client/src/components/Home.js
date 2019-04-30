import React, {Component} from 'react';
// import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import ourStyles from '../styles/ourStyles';
import github from './github/github';
import Axios from '../Axios';
import { history } from '../components/layout/Navbar';
class Home extends Component {
      state = {
        user: ""

      }
        
    
    componentWillMount = () => {
        // this.fetchData();
    }
    fetchData = () => {
        // experiementing not actually anything useful.
        fetch(process.env.REACT_APP_BASE_GITHUB_SIGNIN, { 
            method: "GET",
            mode: 'cors'
            })
            .then( (res)=> {
                console.log(res)
                // history.push('/dashboard')   
            })
            .catch( (err) => {
            })
    }
    render() {
        const {classes} = this.props;
        if (this.props.isAuthenticated) {
            return (<Redirect to='/dashboard' />);
        }
        return (
            <div className={classes.root}>
                <Grid container justify="center" spacing={12}>
                    <Grid item sm={6}>
                        <Paper className={classes.paper}>
                            <h1>Sign Up</h1>
                            <Chip
                                label="Sign In with Github"
                                clickable
                                onClick={this.fetchData}
                                avatar={< Avatar alt = "Natacha" src = "https://avatars0.githubusercontent.com/u/9919?s=280&v=4" />}
                                // href={process.env.REACT_APP_BASE_GITHUB_SIGNIN}
                                component="a"
                                className={classes.chip}/>
                            <Chip
                                label="Sign Up with E-Mail"
                                clickable
                                href="/signUp"
                                component="a"
                                className={classes.chip}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.getToken,
    isAuthenticated: state.user.isAuthenticated,
    redirectTo: state.user.redirectTo
})
const mapDispatchToProps = (dispatch) => ({
});
// export default withStyles(styles)(Navbar);
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(ourStyles))(Home);