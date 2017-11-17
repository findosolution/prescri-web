import React from 'react';
import orderConstants from 'orderConstants'

export class Order extends React.Component {
  render() {
    var {order, user} = this.props;
    var showActions = () => {
      var readyBotton, pReadyBotton, revertBotton, removeBotton, pickedBotton;
      var rejectBotton = <td><button type="button" className="button alert">Reject</button></td>;

      if(user.isPharmacy && order.status === orderConstants.status.NEW) {
        readyBotton = <td><button type="button" className="button success">Ready</button></td>;
      }

      if(user.isPharmacy && order.status === orderConstants.status.NEW) {
        pReadyBotton = <td><button type="button" className="button primary">P_Ready</button></td>;
      }

      if(order.status !== orderConstants.status.NEW) {
        revertBotton = <td><button type="button" className="button warning">Revert</button></td>;
      }

      if(!user.isPharmacy && (order.status === orderConstants.status.READY || order.status === orderConstants.status.P_READY)) {
        pickedBotton = <td><button type="button" className="button secondary">Picked</button></td>;
      }

      if(order.status === orderConstants.status.REJECTED || order.status === orderConstants.status.PICKED) {
        removeBotton = <td><button type="button" className="button secondary">Remove</button></td>;
      }

      return [readyBotton, pReadyBotton, pickedBotton, rejectBotton, revertBotton, removeBotton];
    }
    return(
      <tr className="order-record">
        <td><a href="#">{order.id}</a></td>
        <td>{order.createdAt}</td>
        <td>{order.pharmacy}</td>
        {showActions()}
      </tr>
    );
  }
}

export default Order;
