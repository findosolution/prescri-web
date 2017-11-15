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
    this.state = { submitDisabled: false};
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {

    this.abide = new Foundation.Abide($('#signup-form'), { liveValidate: false,
    validators: {
            emailValidator: function ($el,required,parent) {

              if (!email.test($el.val())) {
                  document.getElementById('email_error').innerText = "Please enter a valid email";
                  return false;
              }
              return true;
            }
        }});
    this.form = $('#signup-form');

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

  enableSubmit() {
    this.setState({ submitDisabled: false });
  }

  disableSubmit() {
    this.setState({ submitDisabled: true });
  }

  handleSignUp(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    var firstname = this.refs.firstname.value;
    var lastname = this.refs.lastname.value;
    var password = this.refs.password.value;
    var email = this.refs.email.value;

    if(firstname.length > 0 && lastname.length> 0 && password.length) {
      var reg_user = {
        firstname : firstname,
        lastname : lastname,
        password : password,
        email : email
      }
      dispatch(actions.startSignUp(reg_user));
    }

  }

  render() {
    function callback (key) {
    console.log(key);
    }
    function loaded() {
    console.log('recaptchaLoaded');
    }
    return(
      <div>
        <h1 className="page-title">Sign up now</h1>
          <div className="row">
                <div className="column small-centered small-11 medium-8 large-8">
                  <div className="container">
                    <form ref="form" id="signup-form" data-abide noValidate onSubmit={this.handleSignUp}>
                      <div className="container_container">
                        <div className="row">
                          <div className="medium-2 columns"><label>First name</label></div>
                          <div className="medium-10 columns">
                            <input type="text" ref="firstname" placeholder="First name" required />
                            <span className="form-error">Please enter your first name</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"><label>Last name</label></div>
                          <div className="medium-10 columns">
                            <input type="text" ref="lastname" placeholder="Last name" required/>
                            <span className="form-error">Please enter your last name</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"><label>Email</label></div>
                          <div className="medium-10 columns">
                            <input type="text" ref="email" placeholder="Email" required data-validator="emailValidator"/>
                            <span id="email_error" className="form-error">Please enter your Email</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"><label>Password</label></div>
                          <div className="medium-10 columns">
                            <input type="password" ref="password" id="password" placeholder="yeti4preZ" required/>
                            <span className="form-error">I am required</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"><label>Re-enter Password</label></div>
                          <div className="medium-10 columns">
                            <input type="password" placeholder="yeti4preZ" required/>
                              <span className="form-error">Hey, passwords are supposed to match!</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="medium-2 columns"></div>
                          <div className="medium-10 columns">
                            <Recaptcha
                                sitekey='6LfhxjgUAAAAANtNr1kX9PQUMNskHQ-xRQCmwfO2'
                                onloadCallback={loaded}
                                verifyCallback={callback}
                                />
                          </div>
                        </div>
                        <div className="row">&nbsp;</div>
                        <div className="row">
                          <div className="medium-2 columns"></div>
                          <div className="medium-10 columns">
                            <button className="button Primary expanded">Join now</button>
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
