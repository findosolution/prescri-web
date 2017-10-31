import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from 'actions';

export class OrderCreate extends React.Component {
  handleSubmit() {
    var {dispatch} = this.props;
    //validations
    var tempOrder = {
      name: this.refs.name.value,
      pharmacy: this.refs.pharmacy.value,
      prescription: this.refs.prescription.value,
      id: 'PRE0005',
      orderby: 'supun',
      status: 1,
      createdAt: 2323232,
      completedAt: null
    }
    console.log('tmpOrder', tempOrder);
    /*dispatch(actions.startAddOrder(tempOrder).then(() => {
        hashHistory.push('/orders');
      }));*/
    dispatch(actions.startAddOrder(tempOrder));
    hashHistory.push('/orders');
  }
  
  render() {
    return(
      <div>
        <div className="page-action">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>
        <h1 className="page-title">Place your order...</h1>
        <div className="row">
          <div className="column small-centered small-11 medium-8 large-8">
            <div className="container">
              <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="grid-x grid-padding-x">
                    <div className="small-3 cell">
                      <label className="text-right">Name :</label>
                    </div>
                    <div className="small-9 cell">
                      <input type="text" ref="name" placeholder="Patient name"/>
                    </div>
                  </div>
                  <div className="grid-x grid-padding-x">
                    <div className="small-3 cell">
                      <label className="text-right">Location :</label>
                    </div>
                    <div className="small-9 cell">
                      <input type="text" ref="location" placeholder="Phamarcy location"/>
                    </div>
                  </div>
                  <div className="grid-x grid-padding-x">
                    <div className="small-3 cell">
                      <label className="text-right">Phamarcy :</label>
                    </div>
                    <div className="small-9 cell">
                      <input type="text" ref="pharmacy" placeholder="Phamarcy name"/>
                    </div>
                  </div>
                  <div className="grid-x grid-padding-x">
                    <div className="small-3 cell">
                      <label className="text-right">Prescription :</label>
                    </div>
                    <div className="small-9 cell">
                      <input type="text" ref="prescription" placeholder="Patient name"/>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="button Primary">place my order</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(OrderCreate);
