import axios from 'axios';

export default {
  // Gets all users
  getUsers: function() {
    return axios.get('/api/users');
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get('/api/users/' + id);
  },
  getUserByEmail: function(email) {
    return axios.get('/api/users?email=' + email);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete('/api/users/' + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios
      .post('/api/users', userData)
      .then(function(res) {
        return res;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  tokenSignIn: function(id_token) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
  },
  tokenSignInAxios: function(id_token) {
    const tokenStr = 'idtoken=' + id_token;
    return axios
      .post('api/tokensignin', tokenStr)
      .then(function(res) {
        console.log(res);
        console.log('Signed in as: ', res.responseText);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  getNudges: function() {
    return axios.get('/api/nudges');
  },
  getNudge: function(id) {
    return axios.get('/api/nudges/' + id);
  },
  deleteNudge: function(id) {
    return axios.delete('/api/nudges/' + id);
  },
  saveNudge: function(nudgesData) {
    return axios.post('/api/nudges', nudgesData);
  },
  sendText: function(data) {
    return axios.post('/api/send', data);
  },
  updateUser: function(id, userData) {
    console.log(userData);
    return axios.put('/api/users/' + id, userData);
  }
};
