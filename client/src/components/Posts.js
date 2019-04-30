import React, { Component } from 'react';
import PostList from './PostList';
import {connect} from 'react-redux';
import { withRouter, Redirect} from 'react-router-dom';
import {GetPosts} from '../actions/';
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
class Posts extends Component {
  state = {

  }

  render() {
    if (!this.props.isAuthenticated) {
      return (<Redirect to='/signIn' />);
    }
 
    return (
      <div className="App" style={Styles.wrapper}>
        <h1> Posts </h1>
        <PostList />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,

})

export default connect(mapStateToProps)(Posts);