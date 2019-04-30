import React, {Component} from 'react';
import PostList from './PostList';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {
    DeletePost,
    postLike,
    UpdatePost,
    EditChange,
    getCount,
    DisableButton
} from '../actions/';
import PostItem from './PostItem';
import {GetPosts} from '../actions/';
const Styles = {
    myPaper: {
        margin: '20px 0px',
        padding: '20px'
    },
    wrapper: {
        padding: '0px 60px'
    }
}
class Posts extends Component {

  constructor(props){
    super(props);
      this.state = {
        posts: [],
        title: '',
        loading: true,
        isEditing: false,
    }
  } 
    
    componentWillMount() {
        this.props.GetPosts();
    }
    removePost = (id) => () => {
        this.props.DeletePost(id);
    }
    onChange = (e) => {
        e.preventDefault();
        this.setState({title: e.target.value})
    }
    formEditing = (id) => () => {
        this.props.EditChange(id);
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
    render() {
        const {loading} = this.state;
        const {myPosts} = this.props
        console.log(this.state.posts);
        if (!this.props.isAuthenticated) {
            return (<Redirect to='/signIn'/>);
        }
        if (loading) {
            return "loading..."
        }
        return (
            <div className="App" style={Styles.wrapper}>
                <h1>Posts</h1>
                {/* <PostList posts={this.state.posts}/> */}
                <div>
                    {this.state.posts.map(post => (
                            <Paper key={post.id} style={Styles.myPaper}>
                                <PostItem myLikes={post.Likes.length} // right here
                                    myTitle={this.state.title} editChange={this.onChange} editForm={this.formEditing} isEditing={this.props.isEditingId === post.id} removePost={this.removePost} {...post}/>
                            </Paper>
                        ))}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
   myPosts: state.post.posts, isEditingId: 
   state.post.isEditingId
})
const mapDispatchToProps = (dispatch, state) => ({
    GetPosts: () => dispatch(GetPosts()),
    // specific.
    EditChange: (id) => dispatch(EditChange(id)),
    UpdatePost: (creds) => dispatch(UpdatePost(creds)),
    postLike: (id) => dispatch(postLike(id)),
    // Pass id to the DeletePost functions.
    DeletePost: (id) => dispatch(DeletePost(id))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));