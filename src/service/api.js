import {
  LOGOUT,
  GET_PERMISSIONS,
  LOGIN,
  SEARCH_USER,
  SEARCH_TRACER,
  GET_ACCOUNT_SESSIONS,
  GET_PRECENSE_INFO,
  SET_PASSWORD,
  REMOVE_SESSION,
  SUSPEND_SESSION,
  SET_TRACER
} from 'constants/apiURL';
import { axios } from 'helpers';

export const authAPI = {
  login(params) {
    return axios.post(LOGIN, params).then(response => {
      return response;
    });
  },

  logout(params) {
    return axios.post(LOGOUT, params).then(response => {
      return response;
    });
  },

  getPermissions(params) {
    return axios.post(GET_PERMISSIONS, params).then(response => {
      return response;
    });
  }
};

export const userAPI = {
  searchUser(params) {
    return axios.post(SEARCH_USER, params).then(response => {
      return response;
    });
  },
  setPassword(params) {
    return axios.post(SET_PASSWORD, params).then(response => {
      return response;
    });
  }
};

export const tracerAPI = {
  searchTracer(params) {
    return axios.post(SEARCH_TRACER, params).then(response => {
      return response;
    });
  }
};

export const sessionAPI = {
  getAccountSessions(params) {
    return axios.post(GET_ACCOUNT_SESSIONS, params).then(response => {
      return response;
    });
  },
  setTracer(params) {
    return axios.post(SET_TRACER, params).then(response => {
      return response;
    });
  },
  suspendSession(params) {
    return axios.post(SUSPEND_SESSION, params).then(response => {
      return response;
    });
  },
  removeSession(params) {
    return axios.post(REMOVE_SESSION, params).then(response => {
      return response;
    });
  }
};

export const presenceAPI = {
  getPresenceInfo(params) {
    return axios.post(GET_PRECENSE_INFO, params).then(response => {
      return response;
    });
  }
};
