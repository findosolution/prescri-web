import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from 'actions';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onGoogleLogin = this.onGoogleLogin.bind(this);
  }
  handleSubmit() {
    var {dispatch} = this.props;
    //dispatch(actions.startAddOrder(tempOrder));
    hashHistory.push('/orders');
  }
  onGoogleLogin() {
    var {dispatch} = this.props;
    dispatch(actions.startLogin());
  }
  render() {
    return(
      <div>
        <h1 className="page-title">Please sign in</h1>
        <div className="row">
          <div className="column small-centered small-10 medium-6 large-5">
            <div className="container">
              <form ref="form" onSubmit={this.handleSubmit}>
                <div className="container_container">
                  <div className="row">
                    <div className="medium-12 columns">
                      <input type="text" ref="userid" placeholder="Email or Mobile number"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns">
                      <input type="text" ref="password" placeholder="Password"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns">
                      <button type="submit" className="button Primary expanded">Sign in</button>
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
                      <button type="button" className="img-button" onClick={this.onGoogleLogin}>
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
