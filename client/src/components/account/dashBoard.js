import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
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
  constructor(props){
    super(props);
    this.state = { 
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      isLoading: true,
      deleted: false,
      error: false,
    }
  }
  componentWillMount(){
  }
  render() {
    if (!this.props.isAuthenticated) {
      return (<Redirect to='/signIn' />);
    }
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