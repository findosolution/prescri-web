import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api/';

var PharmacyAPI = {
  getPharmacies: (location) => {
    var requestURL = `${ROOT_URL}pharmacies/${location}`;
    return axios.get(requestURL).then((snapshot) => {
      if(snapshot.status && snapshot.status === 200) {
        return snapshot.data;
      }
    }, (err) => {
      return err;
    });
  }
};

module.exports = PharmacyAPI;
