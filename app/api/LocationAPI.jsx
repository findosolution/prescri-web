import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api/';

var LocationAPI = {

  saveLocation: (location) => {
    var requestURL = `${ROOT_URL}locations`;
    return axios.post(requestURL, location).then((snapshot) => {
      if(snapshot.status && snapshot.status === 200) {
        return snapshot.data;
      }
    }, (err) => {
      return err;
    });
  },
  getLocations: () => {
    var requestURL = `${ROOT_URL}locations`;
    return axios.get(requestURL).then((snapshot) => {
      if(snapshot.status && snapshot.status === 200) {
        return snapshot.data;
      }
    }, (err) => {
      return err;
    });
  }
};

module.exports = LocationAPI;
