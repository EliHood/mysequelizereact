import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const Styles = {
  myPaper:{
    margin: '20px 0px',
    padding:'20px'
  }

}

const PostList = ({ posts}) =>  (
    <div>
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

export default PostList;