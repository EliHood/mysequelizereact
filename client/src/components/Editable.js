import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Editable = (props) => (
    <div>
        <TextField
            id="outlined-name"
            label="Title"
            style={{width: 560}}
            name="title"
            value={props.editField}
            onChange={props.editChange}
            margin="normal"
            required
            variant="outlined"/>

    </div>
)

export default Editable; 