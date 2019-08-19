import * as types from '../constants/actionType';
import { instance } from 'helpers';

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
    instance.post('/search/user/get/account/sessions', params).then(
      resp => {
        if (resp.data.result !== undefined) {
          dispatch(fetchAccountSessionsSuccess(resp.data.result));
        } else if (resp.data.error !== undefined) {
          dispatch(fetchAccountSessionsError(resp.data.error.description));
        }
      },
      error => {
        dispatch(fetchAccountSessionsError(error.message));
      }
    );
  };
}
