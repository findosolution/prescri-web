import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from 'actions';

export class ConfirmCode extends React.Component {

  constructor(props) {
    super(props);
    this.handleVerify = this.handleVerify.bind(this);
  }

  handleVerify() {

    var code = this.refs.code.value;
    var {unAuthProps} = this.props;
    window.confirmationResult = unAuthProps.confirmationResult;

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

  render() {

    return(
      <div>
        <h1 className="page-title">Please confirm code</h1>
        <div classsName="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <input type="text" ref="code" placeholder="verificaion code"/> <button onClick={this.handleVerify} className="button">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state)=>{
  return state;
})(ConfirmCode);
