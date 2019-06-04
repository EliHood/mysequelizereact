import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Editable from './Editable';
import {connect} from 'react-redux';
import {UpdatePost, postLike} from '../actions/';
import Like from './Like';
// import Axios from '../Axios';
class PostItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            disabled: false,
            myId: 0,
            likes:0
        }
    }

 
    onUpdate = (id, title) => () => {
        // we need the id so expres knows what post to update, and the title being that only editing the title. 
        if(this.props.myTitle !== null){
            const creds = {
                id, title
            }
            this.props.UpdatePost(creds); 
        }
    }

    render(){
        const {title, id, userId, removePost, createdAt, post_content, username, editForm, isEditing, editChange, myTitle, myLikes} = this.props
        return(
            <div>
                   <Typography variant="h6" component="h3">
                   {/* if else teneray operator */}
                
                   {isEditing ? (
                          <Editable editField={myTitle ? myTitle : title} editChange={editChange}/>
                   ): (
                       <div>
                           {title}
                       </div>    
                   )}         
                   </Typography>
                   <Typography  component={'span'} variant={'body2'}>
                       {post_content}
                       <h5>by: {username} </h5>
                       {/*  component span cancels out the cant be a decedent of error */}
                       <Typography  component={'span'} variant={'body2'} color="textSecondary">{moment(createdAt).calendar()}</Typography>
                      {/* likes get like counts */}
                       <Like like={id} likes={myLikes} />
                   </Typography>

                   {!isEditing && this.props.current_user.id !== userId ? (
                       <Button variant="outlined" type="submit" onClick={editForm(id)}>
                           Edit
                       </Button>
                   ):(     
                       // pass id, and myTitle which as we remember myTitle is the new value when updating the title
                        <div>
                            <Button 
                                disabled={myTitle.length <= 3}
                                variant="outlined" 
                                onClick={this.onUpdate(id, myTitle)}>
                                Update
                            </Button>
                            <Button 
                                variant="outlined" 
                                style={{marginLeft: '0.7%'}}
                                onClick={editForm(null)}>
                                Close
                            </Button>
                        </div>
                   )}
                   {!isEditing && (
                    <Button
                        style={{marginLeft: '0.7%'}}
                        variant="outlined"
                        color="primary"
                        type="submit"
                        onClick={removePost(id)}>
                        Remove
                    </Button>
                    )}
           </div>
       )
    }
}
const mapStateToProps = (state) => ({
    isEditingId: state.post.isEditingId,
    isAuthenticated: state.user.isAuthenticated,
    current_user: state.user.current_user
    // myLikes: state.post.likes
})
const mapDispatchToProps = (dispatch) => ({
    // pass creds which can be called anything, but i just call it credentials but it should be called something more 
    // specific.
    UpdatePost: (creds) => dispatch(UpdatePost(creds)),
    postLike: (id) => dispatch( postLike(id)),
 
    // Pass id to the DeletePost functions.
});
export default connect(mapStateToProps, mapDispatchToProps)(PostItem);