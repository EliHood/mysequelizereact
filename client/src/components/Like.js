import React, { Component } from 'react';
import {connect} from 'react-redux';
import {  postLike} from '../actions/';
class Like extends Component{
    constructor(props){
        super(props);
        this.state = {
            heart: false
        }
    }
    //  passes post id thats stored in PostItem.js
    clickLike = async(id) => {
       await this.props.postLike(id);
       // toggles between css class
       this.setState({
           heart: !this.state.heart
       })
    }
    render(){
       return(
            <span style={{ float:'right', fontSize: '1.5em', color:'tomato'}} >
             <i style={{ marginRight: '140px', display:'inline'}} className={this.state.heart ? 'fa fa-heart':'fa fa-heart-o' }>
                    <span style={{ marginLeft: '6px'}} onClick={() =>this.clickLike(this.props.like)}>
                        <a href="#/!">Like</a>   
                    </span>
                    {/* gets the like counts */}
                    <span style={{ marginLeft: '7px'}} >{this.props.likes}  </span>  
                </i>
            </span>       
       )
    }
}
const mapStateToProps = (state) => ({
    isEditingId: state.post.isEditingId,
    // myLikes: state.post.likes
})
const mapDispatchToProps = (dispatch) => ({
    postLike: (id) => dispatch( postLike(id))
    // Pass id to the DeletePost functions.
});
export default connect(mapStateToProps, mapDispatchToProps)(Like);