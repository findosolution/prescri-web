import React from 'react';
import {connect} from 'react-redux';

import OrderUtil from 'OrderUtil';
import Order from 'Order';

export class OrderList extends React.Component {
  render() {
    var {orders, searchText, showCompleted, user} = this.props;
    var filteredOrders = OrderUtil.filterOrdersByPharmacy(orders, searchText, showCompleted)
    var renderOrders = () => {
      return filteredOrders.map((order) => {
        return(
          <Order key={order.id} order={order} user={user} />
        )
      });
    };
    return(
      <div>
        <table className="order-table">
          <tbody>
            {renderOrders()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    orders: state.orders,
    searchText: state.searchText,
    showCompleted: state.showCompleted,
    user: state.user
  }
})(OrderList);
