import axios from 'axios';

export default () =>
  axios.create({
    headers: {
      Authorization: sessionStorage.getItem('id_token')
    }
  });
