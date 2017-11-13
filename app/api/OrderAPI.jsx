import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api/';

var OrderAPI = {

  getOrders: (uid) => {
    var requestURL = `${ROOT_URL}/users/${uid}/orders`;

    return axios.get(requestURL).then((snapshot) => {
      if(snapshot.status && snapshot.status === 200) {
        return snapshot.data;
      }
    }, (err) => {
      return err;
    });
  },
  addOrder: (order) => {
    var requestURL = `${ROOT_URL}orders`;
    return axios.post(requestURL, order).then((snapshot) => {
      if(snapshot.status && snapshot.status === 200) {
        return snapshot.data;
      }
    }, (err) => {
      return err;
    });
  }
};

module.exports = OrderAPI;
