import React, { Component } from 'react';
// import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import { history } from '../components/Navbar';
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  chip: {
    margin: theme.spacing.unit,
  },
});





class Home extends Component {

  constructor(props){
    super(props);
     
    this.state = {
      user: ""
    }


}
  



  


  render() {

    const { classes } = this.props;
    return (
      
      
        <div className={classes.root}>
        <Grid container  justify="center" spacing={44}>
         
          <Grid item sm={6}>
            <Paper className={classes.paper}>
            <h2>Sign Up</h2>

            <Chip label="Sign Up with Github" clickable href="http://127.0.0.1:5000/api/users/auth/github" component="a"  className={classes.chip} />
            <Chip label="Sign Up with E-Mail" clickable href="/signUp" component="a" className={classes.chip} />

              </Paper>

            </Grid>
        </Grid>

      </div>
    );
  }
}
export default withStyles(styles)(Home);
