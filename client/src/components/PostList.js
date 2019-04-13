import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {connect} from 'react-redux';
import {DeletePost} from '../actions/';
const Styles = {
  myPaper:{
    margin: '20px 0px',
    padding:'20px'
  }
}

const PostList = ({DeletePost, posts}) => {
  // Return a new function. Otherwise the DeletePost action will be dispatch each time the Component rerenders.
  const removePost = (id) => () => {
    DeletePost(id);
  }

  return(
    <div>
    {posts.map( (post, i) => (
      <Paper key={i} style={Styles.myPaper}>
        <Typography  variant="h6" component="h3">
        {post.title}  
        </Typography>
        <Typography component="p">
          {post.post_content}
          <h5> by: {post.username}</h5>
         <Typography color="textSecondary">{moment(post.createdAt).calendar()}</Typography>
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          type="submit"
          // onClick={() => DeletePost(post.id)}
           onClick={removePost(post.id)}>
          Remove
        </Button>
      </Paper>
     ))}
  </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  // Pass id to the DeletePost functions.
  DeletePost: (id) => dispatch(DeletePost(id))
});

export default connect(null, mapDispatchToProps) (PostList);