import * as types from '../constants/ActionType';
import axios from 'axios';

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

export function fetchAccountSessions(params, sessionID) {
  return async dispatch => {
    var headers = {
      Authorization: sessionID
    };
    try {
      dispatch(fetchAccountSessionsPending());
      const res = await axios.post(
        types.USER_MANAGER_IP + '/search/user/get/account/sessions',
        params,
        { headers: headers }
      );
      if (res.data.result !== undefined) {
        dispatch(fetchAccountSessionsSuccess(res.data.result));
      } else if (res.data.error !== undefined) {
        dispatch(fetchAccountSessionsError(res.data.error.description));
      }
    } catch (error) {
      dispatch(fetchAccountSessionsError(error.message));
    }
  };
}
