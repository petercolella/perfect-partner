import axios from 'axios';
import tokenHeaderAxios from './tokenHeaderAxios';

export default {
  getUser: id => {
    return tokenHeaderAxios().get('/api/users/' + id);
  },
  deleteUser: id => {
    return tokenHeaderAxios().delete('/api/users/' + id);
  },
  saveUser: userData => {
    return axios.post('/api/users', userData);
  },
  updateUser: (id, userData) => {
    return tokenHeaderAxios().put('/api/users/' + id, userData);
  },
  tokenSignInXhr: id_token => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/token');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
  },
  tokenSignInAxios: (id_token, timeZone, offset) => {
    return axios
      .post('/api/token', { id_token, timeZone, offset })
      .then(res => {
        return res.data;
      });
  },
  getNudge: id => {
    return axios.get('/api/nudges/' + id);
  },
  deleteNudge: id => {
    return axios.delete('/api/nudges/' + id);
  },
  saveNudge: nudgesData => {
    return axios.post('/api/nudges', nudgesData);
  },
  updateNudge: (id, nudgeData) => {
    return axios.put('/api/nudges/' + id, nudgeData);
  },
  activateNudge: (id, data) => {
    return axios.post('/api/text/activate/' + id, data);
  },
  toggleNudgeActivatedState: (id, data) => {
    return axios.post('/api/text/toggle/' + id, data);
  },
  sendText: data => {
    return axios.post('/api/text/send', data);
  },
  deleteDate: id => {
    return axios.delete('/api/dates/' + id);
  },
  saveDate: dateData => {
    return tokenHeaderAxios().post('/api/dates', dateData);
  },
  updateDate: (id, dateData) => {
    return tokenHeaderAxios().put('/api/dates/' + id, dateData);
  }
};
