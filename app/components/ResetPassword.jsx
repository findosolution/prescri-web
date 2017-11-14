import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from 'actions';

export class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.trydifferent = this.trydifferent.bind(this);
  }

  onSubmit(e) {

    e.preventDefault();
    var {dispatch} = this.props;
    var emailMobile = this.refs.emailphone.value;
    console.log(emailMobile);
    if(emailMobile.length > 0) {
      this.refs.emailphone.value = null;
      dispatch(actions.startPwReset(emailMobile));
    } else {
      console.log('Some thing go wrong');
    }
  }

  trydifferent(e) {
    e.preventDefault();
    hashHistory.push('/reset-password');
  }

  render() {

    var {unAuthProps, dispatch} = this.props;

    function header () {
      if(!unAuthProps.status) {
        return <h1 className="page-title">Let's find your account</h1>;
      } else {
        return <h1 className="page-title">We just emailed you a link</h1>;
      }
    }

    function contentHeader() {

      if(!unAuthProps.status) {
        return  <p>Please enter your email</p>;
      } else {
        return <p>Please check your email and click the secure link</p>;
      }
    }

    function contentForm() {

      if(!unAuthProps.status) {
        return <div><input type="text" ref="emailphone" placeholder="email or phone"/>
                  <button className="button expanded">Submit</button></div>;
      } else {
        return <div><input type="hidden" ref="emailphone" value={unAuthProps.email}/>
                <button className="button expanded">Resend link</button></div>;
      }
    }

    function tryDifferentEmail() {
      if(unAuthProps.status) {

          return <button className="button expanded" onClick={(e)=> {
                  e.preventDefault();
                  dispatch(actions.passwordReset({status:false, email: null}))
                  hashHistory.push('/reset-password');
                }}>Try different email</button>;
      }
    }

    return(
      <div>
        {header()}
        <div classsName="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              {contentHeader()}
              <form ref="form" id='pw-reset-form' onSubmit={this.onSubmit}>
              {contentForm()}
              </form>
              {tryDifferentEmail()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state)=>{
  return state;
})(ResetPassword);
