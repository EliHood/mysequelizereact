import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';
import {DeletePost, postLike, UpdatePost,EditChange, GetPosts} from '../actions/';
import PostItem from './PostItem';
const Styles = {
    myPaper: {
        margin: '20px 0px',
        padding: '20px'
    }
}
class PostList extends Component{
    constructor(props){
        super(props);
        this.state ={
            title: '',
            posts:[],
            loading:true
        
        }
    } 

    componentWillMount() {
        this.props.GetPosts();
    }
    componentWillReceiveProps(nextProps, prevState) {
        let hasNewLike = true;
        if (prevState.posts && prevState.posts.length) {
            for (let index = 0; index < nextProps.myPosts.length; index++) {
                if (nextProps.myPosts[index].Likes.length !== prevState.posts[index].Likes.length) {
                    hasNewLike = true;
                }
            }
        }
        if (hasNewLike) {
            this.setState({posts: nextProps.myPosts, loading: false}); // here we are updating the posts state if redux state has updated value of likes
        }
    }
    // Return a new function. Otherwise the DeletePost action will be dispatch each
     // time the Component rerenders.
    removePost = (id) => () => {
        this.props.DeletePost(id);
    }
   
    onChange = (e) => {
        e.preventDefault();
        this.setState({
            title: e.target.value
        })
    }
    formEditing = (id) => ()=> {;
        this.props.EditChange(id);
    }
    render(){
        const {loading} = this.state;
         
        // console.log(this.props.posts)
        // console.log(this.props.ourLikes);
        if(loading){
            return "loading..."
        }
        return (
          <div>
            {this.state.posts.map(post => (
               
              <Paper key={post.id} style={Styles.myPaper}>
                <PostItem
                  myLikes={post.Likes.length} // right here
                  myTitle={this.state.title}
                  editChange={this.onChange}
                  editForm={this.formEditing}
                  isEditing={this.props.isEditingId === post.id}
                  removePost={this.removePost}
                  {...post}
               
                />
              </Paper>
            ))}
          </div>
        );
    }
}
const mapStateToProps = (state) => ({
    isEditingId: state.post.isEditingId,
    myPosts: state.post.posts, 
})
const mapDispatchToProps = (dispatch) => ({
    // pass creds which can be called anything, but i just call it credentials but it should be called something more 
    // specific.
    GetPosts: () => dispatch(GetPosts()),
    EditChange: (id) => dispatch(EditChange(id)),
    UpdatePost: (creds) => dispatch(UpdatePost(creds)),
    postLike: (id) => dispatch( postLike(id)),
    // Pass id to the DeletePost functions.
    DeletePost: (id) => dispatch(DeletePost(id))
});
// without withRouter componentWillReceiveProps will not work like its supposed too.
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostList));