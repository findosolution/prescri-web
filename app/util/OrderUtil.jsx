module.exports = {
  filterOrdersByPharmacy: (orders, searchText, showCompleted) => {
    var filteredOrders = orders;
    filteredOrders = filteredOrders.filter((order) => {
      return order.status !== 6 || showCompleted;
    });

    filteredOrders = filteredOrders.filter((order) => {
      var pharmacy = order.pharmacy;
      return (searchText.length === 0 || pharmacy.toLowerCase().indexOf(searchText) > -1);
    });

    return filteredOrders;
  }
}
