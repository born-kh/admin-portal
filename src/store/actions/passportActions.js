import * as types from 'constants/ActionType';
import { passportAPI } from 'service/api';

export function fetchDocumentsPending() {
  return {
    type: types.FETCH_DOCUMENTS_PENDING
  };
}

export function fetchDocumentsSuccess(documents) {
  return {
    type: types.FETCH_DOCUMENTS_SUCCESS,
    documents
  };
}

export function fetchDocumentsError(error) {
  return {
    type: types.FETCH_DOCUMNETS_ERROR,
    error
  };
}

export function fetchApplicationsPending() {
  return {
    type: types.FETCH_APPLICATIONS_PENDING
  };
}

export function fetchApplicationsSuccess(data, count) {
  return {
    type: types.FETCH_APPLICATIONS_SUCCESS,
    applications: data.applications,
    pages: Math.ceil(data.totalCount / count)
  };
}

export function fetchApplicationsError(error) {
  return {
    type: types.FETCH_APPLICATIONS_ERROR,
    error
  };
}

export function deleteDocument(documentID) {
  return {
    type: types.DELETE_DOCUMENT,
    documentID
  };
}

export function deleteApplication(applicationID) {
  return {
    type: types.APPLICATION_DELETE,
    applicationID
  };
}

export function fetchApplications(params) {
  return dispatch => {
    dispatch(fetchApplicationsPending());
    passportAPI
      .getApplications(params)
      .then(response => {
        if (response.data !== undefined) {
          return dispatch(
            fetchApplicationsSuccess(response.data, params.count)
          );
        } else {
          return dispatch(fetchApplicationsError('response data is undefined'));
        }
      })
      .catch(error => {
        return dispatch(fetchApplicationsError(''));
      });
  };
}

export function fetchDocuments(params) {
  return dispatch => {
    dispatch(fetchDocumentsPending());
    passportAPI
      .getDocuments(params)
      .then(response => {
        if (response.data !== undefined) {
          return dispatch(fetchDocumentsSuccess(response.data.documents));
        } else {
          return dispatch(fetchDocumentsError(response.data));
        }
      })
      .catch(error => {
        try {
          let accounts = JSON.parse(error.response.data.reason);
          if (accounts.accounts) {
            return dispatch(fetchDocumentsError(accounts.accounts[0]));
          } else {
            return dispatch(fetchDocumentsError(''));
          }
        } catch (erro) {
          return dispatch(fetchDocumentsError(''));
        }
      });
  };
}
