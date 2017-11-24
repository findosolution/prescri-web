import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';
import orderConstants from 'orderConstants'

export class Order extends React.Component {
  constructor(props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
  }
  changeStatus(status) {
    var {order, user, dispatch} = this.props;

    var updates = {
      status,
      orderby: order.orderby,
      receivedby: order.receivedby,
      id: order.id,
      referenceOrder: order.referenceOrder
    }

    dispatch(actions.startUpdateOrder(updates));
  }
  render() {
    var {order, user} = this.props;
    var showActions = () => {
      var readyBotton, pReadyBotton, revertBotton, removeBotton, pickedBotton;
      var rejectBotton = <td><button type="button" onClick={() => this.changeStatus(orderConstants.status.REJECTED)} className="button alert">Reject</button></td>;

      if(user.isPharmacy && order.status === orderConstants.status.NEW) {
        readyBotton = <td><button type="button" className="button success" onClick={() => this.changeStatus(orderConstants.status.READY)}>Ready</button></td>;
      }

      if(user.isPharmacy && order.status === orderConstants.status.NEW) {
        pReadyBotton = <td><button type="button" className="button primary" onClick={() => this.changeStatus(orderConstants.status.P_READY)}>P_Ready</button></td>;
      }

      if((user.isPharmacy && order.status !== orderConstants.status.NEW) ||
        (!user.isPharmacy && order.status === orderConstants.status.REJECTED)) {
        revertBotton = <td><button type="button" className="button warning" onClick={() => this.changeStatus(orderConstants.status.NEW)}>Revert</button></td>;
      }

      if(!user.isPharmacy && (order.status === orderConstants.status.READY || order.status === orderConstants.status.P_READY)) {
        pickedBotton = <td><button type="button" className="button secondary" onClick={() => this.changeStatus(orderConstants.status.PICKED)}>Picked</button></td>;
      }

      if(order.status === orderConstants.status.REJECTED || order.status === orderConstants.status.PICKED) {
        removeBotton = <td><button type="button" className="button secondary" onClick={() => this.changeStatus(orderConstants.status.REMOVED)}>Remove</button></td>;
      }

      return [readyBotton, pReadyBotton, pickedBotton, rejectBotton, revertBotton, removeBotton];
    }
    var showStatus = () => {
      return Object.keys(orderConstants.status).find(key => orderConstants.status[key] === order.status);
    }
    return(
      <tr className="order-record">
        <td><a href="#">{order.id}</a></td>
        <td>{order.createdAt}</td>
        <td>{order.pharmacy}</td>
        <td>{showStatus()}</td>
        {showActions()}
      </tr>
    );
  }
}

export default connect()(Order);
