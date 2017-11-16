import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {email} from 'ValidationHelper';
import * as actions from 'actions';
var Recaptcha = require('react-gcaptcha');

export class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.abide;
    this.form;
    this.state = { submitDisabled:false, verifyCallback: false};
    this.handleSignUp = this.handleSignUp.bind(this);
    this.enableSubmit = this.enableSubmit.bind(this);
    this.disableSubmit = this.disableSubmit.bind(this);
    this.callback = this.callback.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

    this.abide = new Foundation.Abide($('#signup-form'), { liveValidate: false});
    this.form = $('#signup-form');

    this.form.on('invalid.zf.abide', () => {
        this.disableSubmit();
    });
    this.form.on('valid.zf.abide', () => {
      if ($('.is-invalid-input', this.form).length == 0) this.enableSubmit();
    });
  }
  enableSubmit() {
    this.setState({ submitDisabled: false });
  }

  disableSubmit() {
    this.setState({ submitDisabled: true });
  }

  onChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);

  }

  componenWillUnmount() {
      this.abide.destory();
  }

  handleSignUp(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    var firstname = this.refs.firstname.value;
    var password = this.refs.password.value;
    var email = this.refs.email.value;

    if(firstname.length > 0 && password.length > 0 && email.length > 0) {
      var reg_user = {
        firstname : firstname,
        password : password,
        email : email
      }
      dispatch(actions.startSignUp(reg_user));
    }
  }

  callback (key) {
    if(key) {
      this.setState({
        verifyCallback : true
      });
    }
  }

  render() {

    var {submitDisabled, verifyCallback} = this.state;
    var {errors} = this.props;

    function enableSignUp() {
      if(!submitDisabled && verifyCallback) {
        return false;
      } else {
        return true;
      }
    };

    function errorHolder() {
      if(errors.length>0) {
        return <div data-alert className="alert-box alert radius">
        This is a success alert with a radius.
        <a href="#" className="close">&times;</a>
          </div>;
      }
      
    };

    return(
      <div>
        <h1 className="page-title">Sign up now</h1>
          <div className="row">
                <div className="column small-centered small-11 medium-8 large-8">
                  <div className="container">
                    <form ref="form" id="signup-form" data-abide noValidate onSubmit={this.handleSignUp}>
                      {errorHolder()}
                      <div className="container_container">
                        <div className="row">
                          <div className="medium-2 columns"><label>First name</label></div>
                          <div className="medium-10 columns">
                            <input type="text" ref="firstname" placeholder="First name" required onChange={this.onChange} />
                            <span className="form-error">Please enter your first name</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"><label>Email</label></div>
                          <div className="medium-10 columns">
                            <input type="text" ref="email" placeholder="Email" required pattern="email" onChange={this.onChange}/>
                            <span id="email_error" className="form-error">Please enter a valid email</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"><label>Password</label></div>
                          <div className="medium-10 columns">
                            <input type="password" ref="password" id="password" placeholder="yeti4preZ" required onChange={this.onChange}/>
                            <span className="form-error">I am required</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"><label>Re-enter Password</label></div>
                          <div className="medium-10 columns">
                            <input type="password" placeholder="yeti4preZ" required onChange={this.onChange}/>
                              <span className="form-error">Hey, passwords are supposed to match!</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"></div>
                          <div id="g-captcha" className="medium-10 columns">
                            <Recaptcha
                                sitekey='6LfhxjgUAAAAANtNr1kX9PQUMNskHQ-xRQCmwfO2'
                                render="explicit" onloadCallback={console.log.bind(this, "recaptcha loaded")}
                                verifyCallback={this.callback}
                                />
                          </div>
                        </div>
                        <div className="row">&nbsp;</div>
                        <div className="row">
                          <div className="medium-2 columns"></div>
                          <div className="medium-10 columns">
                            <button disabled={enableSignUp()} className="button Primary expanded">Join now</button>
                          </div>
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

export default connect((state)=>{
  return state;
})(SignUp);
