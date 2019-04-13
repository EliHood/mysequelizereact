import React, { Component } from 'react';
import PostList from './PostList';
import Axios from '../Axios';
import {connect} from 'react-redux';
import { withRouter, Redirect} from 'react-router-dom';
import {DeletePost} from '../actions/';

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
      posts: [],
      loading: true,
    }
  
  getPosts = () => {
    Axios.get(process.env.REACT_APP_GET_POSTS)
    .then( (res) => {
       this.setState({
          posts: res.data,
          loading: false
        })
    })
    // console.log(this.state.posts);
  }
  componentWillMount(){
    this.getPosts();
  }

  onDelete = (id) => {
    Axios.post(`/api/posts/delete/${id}`);
    this.setState({
      posts: this.state.posts.filter(post => post.id !== id)
    })
  }


  render() {
    const {loading, posts} = this.state;
    if (!this.props.isAuthenticated) {
      return (<Redirect to='/signIn' />);
    }
    if(loading){
      return "loading..."
    }
    return (
      <div className="App" style={Styles.wrapper}>
        <h1> Posts </h1>
        <PostList DeletePost={this.onDelete} posts={posts}/>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
})
const mapDispatchToProps = (dispatch) => ({
  // newPost: (post) => dispatch(newPost(post)),
  // DeletePost: (id) => dispatch( DeletePost(id))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));