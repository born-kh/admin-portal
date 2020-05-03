import * as types from 'constants/ActionType';
import { sessionAPI } from 'service/api';

export function fetchAccountSessionsPending() {
  return {
    type: types.FETCH_ACCOUNT_SESSIONS_PENDING
  };
}

export function fetchAccountSessionsSuccess(data) {
  return {
    type: types.FETCH_ACCOUNT_SESSIONS_SUCCESS,
    sessions: data.sessions,
    blockList: data.blocklist
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

export function deleteSession(sessionID) {
  return {
    type: types.SESSION_DELETE,
    sessionID
  };
}
export function fetchAccountSessions(params) {
  return dispatch => {
    dispatch(fetchAccountSessionsPending());

    sessionAPI
      .getAccountSessions(params)
      .then(response => {
        console.log(response);
        if (response.data.sessions !== undefined) {
          dispatch(fetchAccountSessionsSuccess(response.data));
        } else if (response.data.error !== undefined) {
          dispatch(fetchAccountSessionsError(response.data.error));
        }
      })
      .catch(error => {
        console.log(error);

        dispatch(fetchAccountSessionsError(''));
      });
  };
}
