import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {connect} from 'react-redux';
import {DeletePost, UpdatePost,EditChange, DisableButton} from '../actions/';
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
            title: ''
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
        const {posts} = this.props;
        return (
            <div>
                {posts.map((post, i) => (
                    <Paper key={post.id} style={Styles.myPaper}>
                    {/* {...post} prevents us from writing all of the properties out */}
                        <PostItem
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
        )
    }
}

const mapStateToProps = (state) => ({
    isEditingId: state.post.isEditingId
})
const mapDispatchToProps = (dispatch) => ({
    // pass creds which can be called anything, but i just call it credentials but it should be called something more 
    // specific.
    EditChange: (id) => dispatch(EditChange(id)),
    UpdatePost: (creds) => dispatch(UpdatePost(creds)),
    // Pass id to the DeletePost functions.
    DeletePost: (id) => dispatch(DeletePost(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(PostList);