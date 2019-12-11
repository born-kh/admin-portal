import * as types from '../../constants/actionType';
import { sessionAPI } from 'service/api';

export function fetchAccountSessionsPending() {
  return {
    type: types.FETCH_ACCOUNT_SESSIONS_PENDING
  };
}

export function fetchAccountSessionsSuccess(result) {
  console.log(result);
  return {
    type: types.FETCH_ACCOUNT_SESSIONS_SUCCESS,
    result
  };
}

export function fetchAccountSessionsError(error) {
  return {
    type: types.FETCH_ACCOUNT_SESSIONS_ERROR,
    error
  };
}

export function updateTracing(params) {
  return {
    type: types.UPDATE_TRACING,
    params
  };
}

export function updateSuspended(params) {
  return {
    type: types.UPDATE_SUSPENDED,
    params
  };
}

export function fetchAccountSessions(params) {
  return dispatch => {
    dispatch(fetchAccountSessionsPending());

    sessionAPI
      .getAccountSessions(params)
      .then(response => {
        if (response.data.sessionDataArray !== undefined) {
          dispatch(fetchAccountSessionsSuccess(response.data));
        } else if (response.data.error !== undefined) {
          dispatch(fetchAccountSessionsError(response.data));
        }
      })
      .catch(error => {
        dispatch(fetchAccountSessionsError(error.message));
      });
  };
}
