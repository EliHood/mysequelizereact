import React, {Component} from 'react';
// import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import ourStyles from '../styles/ourStyles';
class Home extends Component {
      state = {
        user: ""

      }
 
    render() {
        const {classes} = this.props;
        if (this.props.isAuthenticated) {
            return (<Redirect to='/dashboard' />);
        }
        return (
            <div className={classes.root}>
            
                <Grid container justify="center" spacing={16}>
                    <Grid item sm={6}>
                        <Paper className={classes.paper}>
                            <h1>Sign Up</h1>
                    

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