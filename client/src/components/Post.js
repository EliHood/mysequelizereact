import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {newPost} from '../actions/';
import {Redirect, withRouter} from 'react-router-dom';
class Post extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {
                title: "",
                postContent: "",
                userId: ""
            },
            passErr: "",
            regSuccess: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();

        const {formData} = this.state;

        this.setState({
            formData: {
                ...formData,
                [e.target.name]: e.target.value
            }
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {formData} = this.state;
        const {title, postContent} = formData;
        this.setState({title: this.state.title, postContent: this.state.postContent});

        const creds = {
            title,
            postContent
        }

        this
            .props
            .newPost(creds);
        console.log(creds);
    }

    render() {
        const {token} = this.props
        if (!token) {
            return <Redirect to='/'/>
        }

        return (
            <div style={{
                padding: '20px 100px'
            }}>

                {this.props.error && (
                    <div style={{
                        color: 'red'
                    }}>
                        {this.props.error}
                    </div>
                )}

                {this.state.passErr && (
                    <div style={{
                        color: 'red'
                    }}>
                        {this.state.passErr}
                    </div>
                )}

                <h1>New Post</h1>

                <form onSubmit={this.handleSubmit}>

                    <TextField
                        id="outlined-name"
                        label="Title"
                        style={{
                        width: 560
                    }}
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"/>
                    <br></br>
                    <TextField
                        id="outlined-multiline-static"
                        label="Post Content"
                        name="postContent"
                        multiline
                        style={{
                        width: 560
                    }}
                        rows="4"
                        value={this.state.postContent}
                        onChange={this.handleChange}
                        defaultValue=""
                        margin="normal"
                        variant="outlined"/>
                    <br></br>
                    <br></br>

                    <Button variant="outlined" color="primary" type="submit">
                        Submit
                    </Button>

                </form>

            </div>

        );
    }

}

const mapStateToProps = (state) => ({token: state.user.getToken, error: state.post.postError})

const mapDispatchToProps = (dispatch) => ({
    newPost: (post) => dispatch(newPost(post))

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));