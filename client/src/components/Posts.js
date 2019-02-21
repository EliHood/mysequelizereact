import React, { Component } from 'react';
import PostList from './PostList';
import Axios from '../Axios';

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

  constructor(props){
    super(props);

    this.state = {
      posts: [],
      loading: true,
    }
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

  render() {
    const {loading, posts} = this.state;

    if(loading){
      return "loading..."
    }

    return (
      <div className="App" style={Styles.wrapper}>
        <h1> Posts </h1>

     
        <PostList posts={posts}/>
      </div>
    );
  }
}

export default Posts;