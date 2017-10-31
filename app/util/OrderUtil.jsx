module.exports = {
  filterOrdersByPharmacy: (orders, searchText, showCompleted) => {
    var filteredOrders = orders;
    filteredOrders = filteredOrders.filter((order) => {
      return order.status !== 5 || showCompleted;
    });

    filteredOrders = filteredOrders.filter((order) => {
      var pharmacy = order.pharmacy.toLowerCase();
      return (searchText.length === 0 || pharmacy.indexOf(searchText) > -1);
    });

    return filteredOrders;
  }
}
