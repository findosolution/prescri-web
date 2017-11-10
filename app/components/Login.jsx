import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {number, email,numberOremail} from 'ValidationHelper';
import * as actions from 'actions';
import {firebase} from 'myFirebase';

export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.abide;
    this.form;
    this.state = { submitDisabled: false, isShown: false };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgotPassword =this.handleForgotPassword.bind(this);

    this.onGoogleLogin = this.onGoogleLogin.bind(this);
  }

  componentDidMount() {

    this.abide = new Foundation.Abide($('#login-form'), { liveValidate: false,
    patterns : {
      numberOremail : numberOremail

    }});
    this.form = $('#login-form');

    this.form.on('invalid.zf.abide', () => {
      this.disableSubmit();
    });
    this.form.on('valid.zf.abide', () => {
      if ($('.is-invalid-input', this.form).length == 0) this.enableSubmit();
    });
  }
  componenWillUnmount() {
      this.abide.destory();
  }
  onChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);

  }

  enableSubmit() {
    this.setState({ submitDisabled: false });
  }

  disableSubmit() {
    this.setState({ submitDisabled: true });
  }

  handleVerify() {
    var code = this.refs.code.value;
    console.log(code);
    window.confirmationResult.confirm(code).then(function (result) {
  // User signed in successfully.
      var user = result.user;
      console.log(user);
      // ...
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    var userId = this.refs.userid.value;
    var userPw = this.refs.password.value;
    var userObj = {};

    if(userId.length > 0 && userPw.length > 0 ){

      if(email.test(userId)) {
        userObj = {
          userId : userId,
          userPw : userPw,
          method : 'USRPW',
          recaptchaVerifier : null
        };
      } else if (number.test(userId)) {

        window.recaptchaVerifier = new  firebase.auth.RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': function(response) {
            hashHistory.push('/confirm-code');
          }
        });

        userObj = {
          userId : '+94772325524',
          userPw : null,
          method : 'MOBILE',
          recaptchaVerifier: window.recaptchaVerifier
        };

      }
      dispatch(actions.startLogin(userObj));

    } else {
      console.log('Some thing go wrong');
    }
  }

  handleForgotPassword (e) {
    e.preventDefault();
    console.log('handleForgotPassword');
    hashHistory.push('/reset-password');
  }

  onGoogleLogin(provider) {

    var {dispatch} = this.props;

    var userObj = {
      userId : null,
      userPw : null,
      method : provider
    };

    dispatch(actions.startLogin(userObj));
  }

  render() {
    return(
      <div>
        <h1 className="page-title">Please sign in</h1>
        <div className="row">
          <div className="column small-centered small-10 medium-6 large-5">
            <div className="container">
              <form ref="form" id="login-form" data-abide noValidate onSubmit={this.handleSubmit}>
                <div className="container_container">
                  <div className="row">
                    <div className="medium-12 columns">
                      <input type="text" ref="userid" placeholder="Email or Mobile number" required pattern="numberOremail"/>
                      <span className="form-error">Email or Mobile number</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns">
                      <input type="password" ref="password" placeholder="Password"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns">
                      <button disabled={this.state.submitDisabled} id='sign-in-button' className="button Primary expanded">Sign in</button>
                  </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns centered">
                      <a href="#" onClick={this.handleForgotPassword}>Forgot password</a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns">
                      <label className="register-label">Don't have a account... please <a className="inner-route-register">sign up here</a></label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns">
                      <label className="social-label">login with</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-1 columns">
                      <button type="button" className="img-button">
                        <img src="images/facebook.svg"/>
                      </button>
                    </div>
                    <div className="medium-1 columns">
                      <button type="button" className="img-button" onClick={() => this.onGoogleLogin('GOOGLE')}>
                        <img src="images/google-plus.svg"/>
                      </button>
                    </div>
                    <div className="medium-1 columns">
                      <button type="button" className="img-button">
                        <img src="images/twitter.svg"/>
                      </button>
                    </div>
                    <div className="medium-1 columns">
                      <button type="button" className="img-button">
                        <img src="images/linkedin.svg"/>
                      </button>
                    </div>
                    <div className="medium-8 columns"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
