import axios from 'axios';
import tokenHeaderAxios from './tokenHeaderAxios';

export default {
  getUser: function(id) {
    return tokenHeaderAxios().get('/api/users/' + id);
  },
  deleteUser: function(id) {
    return tokenHeaderAxios().delete('/api/users/' + id);
  },
  saveUser: function(userData) {
    return axios.post('/api/users', userData);
  },
  updateUser: function(id, userData) {
    return tokenHeaderAxios().put('/api/users/' + id, userData);
  },
  tokenSignInXhr: function(id_token) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/token');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
  },
  tokenSignInAxios: function(id_token) {
    const tokenStr = 'idtoken=' + id_token;
    return axios.post('/api/token', tokenStr).then(function(res) {
      return res.data;
    });
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
  updateNudge: function(id, nudgeData) {
    return axios.put('/api/nudges/' + id, nudgeData);
  },
  activateNudge: function(id, data) {
    return axios.post('/api/text/activate/' + id, data);
  },
  toggleNudgeActivatedState: function(id, data) {
    return axios.post('/api/text/toggle/' + id, data);
  },
  sendText: function(data) {
    return axios.post('/api/text/send', data);
  }
};
