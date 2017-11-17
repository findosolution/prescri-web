import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api/';

var UserAPI = {

  registerIfNot: (user) => {
    var requestURL = `${ROOT_URL}users`;
    return axios.post(requestURL, user).then((snapshot) => {
      if(snapshot.status && snapshot.status === 200) {
        return snapshot.data;
      }
    }, (err) => {
      return err;
    });
  },
  getUser: (uid) => {
    var requestURL = `${ROOT_URL}users/${uid}`;
    return axios.get(requestURL).then((snapshot) => {
      if(snapshot.status && snapshot.status === 200) {
        return snapshot.data;
      }
    }, (err) => {
      return err;
    });
  }
};

module.exports = UserAPI;
