import React, {Component} from 'react';
// import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Axios from '../Axios';
import Avatar from '@material-ui/core/Avatar';
import {Redirect, withRouter} from 'react-router-dom';
import { history } from '../components/layout/Navbar';
const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },

    chip: {
        margin: theme.spacing.unit
    }
});

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: ""
        }

     

    }
   



    render() {

        const {classes} = this.props;

        if (this.props.isAuthenticated) {
            return (<Redirect to='/dashboard' />);
        }

        return (

            <div className={classes.root}>
                <Grid container justify="center" spacing={44}>

                    <Grid item sm={7}>
                        <Paper className={classes.paper}>
                            <h2>Sign Up</h2> 

                            <Chip
                                label="Sign In with Github"
                                clickable
                                avatar={< Avatar alt = "Natacha" src = "https://avatars0.githubusercontent.com/u/9919?s=280&v=4" />}
                                component="a"
                                href="http://localhost:8000/api/users/auth/github"
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
    redirectTo: state.user.redirectTo
})

const mapDispatchToProps = (dispatch) => ({


});

// export default withStyles(styles)(Navbar);
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Home);