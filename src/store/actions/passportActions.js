import * as types from '../../constants/actionType';
import { passportAPI } from 'service/api';

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

export function fetchAccountsPending() {
  return {
    type: types.FETCH_ACCOUNTS_PENDING
  };
}

export function fetchAccountsSuccess(accounts) {
  console.log(accounts);
  return {
    type: types.FETCH_ACCOUNTS_SUCCESS,
    accounts
  };
}

export function fetchAccountsError(error) {
  return {
    type: types.FETCH_ACCOUNTS_ERROR,
    error
  };
}

export function fetchAccounts(params) {
  return dispatch => {
    dispatch(fetchAccountsPending());
    passportAPI
      .getAccounts(params)
      .then(response => {
        console.log('accounts', response.data);
        if (response.data !== undefined) {
          return dispatch(fetchAccountsSuccess(response.data));
        } else {
          return dispatch(fetchAccountsError(response));
        }
      })
      .catch(error => {
        console.log('error', error);
        return dispatch(fetchAccountsError(error.message));
      });
  };
}

export function fetchDocuments(params) {
  return dispatch => {
    dispatch(fetchDocumentsPending());
    passportAPI
      .getDocuments(params)
      .then(response => {
        console.log('documnets', response);
        if (response.data !== undefined) {
          return dispatch(fetchDocumentsSuccess(response.data.documents));
        } else {
          return dispatch(fetchDocumentsError(response.data));
        }
      })
      .catch(error => {
        console.log('error', error);
        return dispatch(fetchDocumentsError(error.message));
      });
  };
}
