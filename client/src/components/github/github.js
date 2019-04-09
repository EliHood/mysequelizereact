import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
const Github = () => (

    <Chip
        label="Sign In with Github"
        clickable
        avatar={<Avatar alt = "Natacha" src = "https://avatars0.githubusercontent.com/u/9919?s=280&v=4" />}
        component="a"
        href={this.props.link}
    />
    
   
   

);




export default Github;