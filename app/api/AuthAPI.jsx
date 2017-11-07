import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api/';

var AuthAPI = {

  authenticate: () => {
    var requestURL = `${ROOT_URL}auth`;

    return axios.get(requestURL).then((snapshot) => {
      if(snapshot.status && snapshot.status === 200) {
        console.log(snapshot.data);
        return snapshot.data;
      }
    }, (err) => {
      return err;
    });
  }
};

module.exports = AuthAPI;
