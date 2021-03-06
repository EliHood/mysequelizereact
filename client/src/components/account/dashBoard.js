import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
const Styles = {
    myPaper:{
      margin: '20px 0px',
      padding:'20px'
    }
    , 
    wrapper:{
      padding:'0px 60px'
    }
}
class Dashboard extends Component {
  state = { 
  
  }
  
  render() {
    // if (!this.props.isAuthenticated) {
    //   return (<Redirect to='/signIn' />);
    // }
    return (
      <div className="App" style={Styles.wrapper}>
        <h1> Welcome</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
})
// export default withStyles(styles)(Navbar);
export default compose(connect(mapStateToProps, null))(Dashboard);