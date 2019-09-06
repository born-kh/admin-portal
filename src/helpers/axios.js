import axios from 'axios';

import { baseURL } from 'constants/apiURL';
import { SESSION_TOKEN } from 'constants/localStorage';
const client = axios.create({
  baseURL: baseURL
});

client.defaults.headers.common['Accept-Language'] = 'ru';

client.interceptors.request.use(
  function(config) {
    config.headers['X-Auth-Token'] = localStorage.getItem(SESSION_TOKEN);

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default client;
