import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Forget} from '../../actions/';
const Styles = {
    myPaper: {
        margin: '20px 0px',
        padding: '20px'
    },
    wrapper: {
        padding: '0px 60px'
    },
    textF: {
        width: '500px'
    }
}
class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }
    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };
    sendEmail = e => {
        e.preventDefault();
        const { email } = this.state
        const creds = {
            email
        }
        console.log(creds);
        this.props.Forget(creds);
    };
    render() {
        const {email} = this.state;
        return (
            <div className="App" style={Styles.wrapper}>
                <h1> Forgot Password</h1>
                {this.props.showError && (
                  <div>
                    <p>
                      That email address isn't recognized. Please try again or register
                      for a new account.
                    </p>
                  </div>
                )}
                {this.props.messageFromServer === 'recovery email sent' && (
                    <div>
                        <h3>Password Reset Email Successfully Sent!</h3>
                    </div>
                )}
                <form className="profile-form" onSubmit={this.sendEmail}>
                    <TextField
                        id="email"
                        label="Email"
                        style={Styles.textF}
                        value={email}
                        onChange={this.handleChange('email')}
                        placeholder="Email Address"/>
                    <br></br>
                    <br></br>
                    <Button variant="outlined" type="submit">
                        Send Password Reset Email
                    </Button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    // token: state.user.getToken, 
    // error: state.post.postError
    showError: state.account.showError,
    messageFromServer: state.account.messageFromServer
})
const mapDispatchToProps = (dispatch) => ({
    Forget: (creds) => dispatch(Forget(creds))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Forgot));