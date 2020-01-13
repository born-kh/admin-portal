import * as types from '../../constants/actionType';
import { passportAPI } from 'service/api';
import { errorMessage } from 'helpers/errorMessage';

export function fetchDocumentsPending() {
  return {
    type: types.FETCH_DOCUMENTS_PENDING
  };
}

export function fetchDocumentsSuccess(documents) {
  return {
    type: types.FETCH_DOCUMENTS_SUCCESS,
    payload: documents
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
    type: types.FETCH_ACCOUNTS_PENDING
  };
}

export function fetchApplicationsSuccess(data, count) {
  return {
    type: types.FETCH_ACCOUNTS_SUCCESS,
    applications: data.applications,
    pages: Math.ceil(data.totalCount / count)
  };
}

export function fetchApplicationsError(error) {
  return {
    type: types.FETCH_ACCOUNTS_ERROR,
    error
  };
}
export function fetchApplicationSearchPending() {
  return {
    type: types.FETCH_ACCOUNTS_SEARCH_PENDING
  };
}

export function fetchApplicationSearchSuccess(data) {
  return {
    type: types.FETCH_ACCOUNTS_SEARCH_SUCCESS,
    payload: data.applications
  };
}

export function fetchApplicationSearchError(error) {
  return {
    type: types.FETCH_ACCOUNTS_SEARCH_ERROR,
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
  console.log(applicationID);
  return {
    type: types.APPLICATION_DELETE,
    applicationID
  };
}

export function fetchApplications(params) {
  console.log(params);
  return dispatch => {
    dispatch(fetchApplicationsPending());
    passportAPI
      .getApplications(params)
      .then(response => {
        console.log('Applications', response.status);
        if (response.data !== undefined) {
          return dispatch(
            fetchApplicationsSuccess(response.data, params.count)
          );
        } else {
          return dispatch(fetchApplicationsError(response));
        }
      })
      .catch(error => {
        return dispatch(fetchApplicationsError(errorMessage(error)));
      });
  };
}

export function fetchApplicationSearch(params) {
  console.log('fetchApplicationSearch');
  return dispatch => {
    dispatch(fetchApplicationSearchPending());
    passportAPI
      .getApplicationsByName(params)
      .then(response => {
        if (response.data.applications !== undefined) {
          return dispatch(fetchApplicationSearchSuccess(response.data));
        } else {
          return dispatch(fetchApplicationSearchError(response));
        }
      })
      .catch(error => {
        return dispatch(fetchApplicationSearchError(errorMessage(error)));
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
        return dispatch(fetchDocumentsError(errorMessage(error)));
      });
  };
}
