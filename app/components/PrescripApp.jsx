import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import OrderSearch from 'OrderSearch';
import OrderList from 'OrderList';

export class PrescripApp extends React.Component {
  render() {
    var redirectToNew = () => {
      hashHistory.push('/new');
    };
    return(
      <div>
        <div className="page-action">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>
        <h1 className="page-title">My current orders...</h1>
        <div className="row">
          <div className="column small-centered small-11 medium-8 large-8">
            <div className="page-route">
              <a onClick={redirectToNew}>place your order</a>
            </div>
            <div className="container">
              <OrderSearch/>
              <OrderList/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(PrescripApp);
