import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

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

  getPosts = async () => {

    const url = await fetch('/api/posts')
    const json = await url.json();

    this.setState({
      posts: json,
      loading: false
    })
    
    console.log(this.state.posts);

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
        <h1> Welcome</h1>

        {posts.map( (post, i) => (
          
        <Paper key={i} style={Styles.myPaper}>
          <Typography  variant="h6" component="h3">
            {post.title}  
        
          </Typography>
       
          <Typography component="p">
            {post.post_content}
       
            <h5> by: {post.username}</h5>
            <h5> {moment(post.createdAt).calendar()}</h5>
          </Typography>
        </Paper>

        ))}
      </div>
    );
  }
}

export default Posts;