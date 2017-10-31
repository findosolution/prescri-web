import React from 'react';

export class Order extends React.Component {
  render() {
    var {order} = this.props;
    return(
      <tr className="order-record">
        <td><a href="#">{order.id}</a></td>
        <td>{order.createdAt}</td>
        <td>{order.pharmacy}</td>
        <td>
          <button type="button" className="button success">Ready</button>
        </td>
        <td>
          <button type="button" className="button warning">P/Ready</button>
        </td>
        <td>
          <button type="button" className="button alert">Reject</button>
        </td>
      </tr>
    );
  }
}

export default Order;
