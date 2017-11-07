import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from 'actions';

export class OrderCreate extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    dispatch(actions.startLogout());
  }
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
    var redirectToOrders = () => {
      hashHistory.push('/orders');
    };
    return(
      <div>
        <div className="page-action">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>
        <h1 className="page-title">Place your order...</h1>
        <div className="row">
          <div className="column small-centered small-11 medium-8 large-8">
            <div className="page-route">
              <a onClick={redirectToOrders}>list my orders</a>
            </div>
            <div className="container">
              <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="container_container">
                  <div className="row">
                    <div className="medium-2 columns"><label>Name</label></div>
                    <div className="medium-10 columns">
                      <input type="text" ref="name" placeholder="Patient name"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-2 columns"><label>Location</label></div>
                    <div className="medium-10 columns">
                      <input type="text" ref="location" placeholder="Phamarcy location"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-2 columns"><label>Phamarcy</label></div>
                    <div className="medium-8 columns">
                      <input type="text" ref="pharmacy" placeholder="Phamarcy name"/>
                    </div>
                    <div className="medium-2 columns inner-route">
                      <a>view in map</a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-2 columns"><label>Prescription</label></div>
                    <div className="medium-10 columns">
                      <input type="text" ref="prescription" placeholder="prescription"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-2 columns"></div>
                    <div className="medium-10 columns">
                      <button type="submit" className="button Primary expanded">Place my order</button>
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

export default connect()(OrderCreate);
