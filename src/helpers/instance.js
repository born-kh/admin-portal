import * as axios from 'axios';
import { USER_SESSION } from 'constants/ActionType';
import { SERVICE_URL } from 'constants/apiURL';

const instance = axios.create({
  baseURL: SERVICE_URL
});

instance.interceptors.request.use(
  function(config) {
    const userSession = JSON.parse(localStorage.getItem(USER_SESSION));

    if (userSession) {
      config.headers['Authorization'] = userSession.session_data.session_token;
      config.headers['Content-Type'] = 'application/json; charset=utf-8';
      config.headers['Accept'] = 'application/json';
      config.headers['Access-Control-Allow-Origin'] = '*';
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;
