import * as axios from 'axios';
import { SERVICE_URL } from 'constants/apiURL';
import { SESSION_TOKEN } from 'constants/localStorage';

const instance = axios.create({
  baseURL: SERVICE_URL
});

instance.interceptors.request.use(
  function(config) {
    config.headers['Authorization'] = localStorage.getItem(SESSION_TOKEN);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;
