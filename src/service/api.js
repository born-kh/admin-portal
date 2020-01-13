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
  SET_TRACER,
  GET_DOCUMENTS,
  GET_APPLICATIONS,
  GET_APPLICATIONS_BY_NAME,
  SET_DOCUMENT_STATUS,
  SET_DOCUMENT_FIELDS,
  SET_DOCUMENT_NOTE,
  SET_DOCUMENT_TAGS,
  SET_APPLICATION_STATUS,
  GET_DOCUMENT_TYPES,
  DELETE_DOCUMENT,
  GET_APPLICATIONS_BY_ACCOUNT
} from 'constants/apiURL';
import { axios } from 'helpers';

/* AUTH API */

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

/* User  Manager API */

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
/* Tracer Manager API */

export const tracerAPI = {
  searchTracer(params) {
    return axios.post(SEARCH_TRACER, params).then(response => {
      return response;
    });
  }
};
/* Session Manager API */

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

/* Prsence API */

export const presenceAPI = {
  getPresenceInfo(params) {
    return axios.post(GET_PRECENSE_INFO, params).then(response => {
      return response;
    });
  }
};

/* Passport Manager API */

export const passportAPI = {
  getApplications(params) {
    return axios.post(GET_APPLICATIONS, params).then(response => {
      console.log(response);
      return response;
    });
  },
  getDocuments(params) {
    return axios.post(GET_DOCUMENTS, params).then(response => {
      return response;
    });
  },
  getApplicationsByName(params) {
    return axios.post(GET_APPLICATIONS_BY_NAME, params).then(response => {
      return response;
    });
  },
  setApplicationStatus(params) {
    return axios.post(SET_APPLICATION_STATUS, params).then(response => {
      return response;
    });
  },
  setDocumentStatus(params) {
    console.log(params);
    return axios.post(SET_DOCUMENT_STATUS, params).then(response => {
      return response;
    });
  },
  setDocumentFields(params) {
    console.log(params);
    return axios.post(SET_DOCUMENT_FIELDS, params).then(response => {
      return response;
    });
  },
  setDocumentNote(params) {
    return axios.post(SET_DOCUMENT_NOTE, params).then(response => {
      return response;
    });
  },
  setDocumentTags(params) {
    return axios.post(SET_DOCUMENT_TAGS, params).then(response => {
      return response;
    });
  },
  getDocumentTypes(params) {
    return axios.post(GET_DOCUMENT_TYPES, params).then(response => {
      return response;
    });
  },
  deleteDocument(params) {
    return axios.post(DELETE_DOCUMENT, params).then(response => {
      return response;
    });
  },
  getApplicationByAccount(params) {
    return axios.post(GET_APPLICATIONS_BY_ACCOUNT, params).then(response => {
      return response;
    });
  }
};
