import * as types from "../constants/ActionType";
import axios from 'axios';

export function fetchAccountSessionsPending() {
  return {
    type: types.FETCH_ACCOUNT_SESSIONS_PENDING,

  };
}

export function fetchAccountSessionsSuccess(result) {
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


export function fetchAccountSessions(params, sessionID) {
  console.log(sessionID)
  return (dispatch) => {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': sessionID,
    }
    dispatch(fetchAccountSessionsPending());
    axios.post(types.USER_MANAGER_IP  + "/search/user/get/account/sessions", params, { headers: headers })
      .then((result) => {
        if (result.status === 200) {
          dispatch(fetchAccountSessionsSuccess(result.data.result))
        }
      },
        (error) => {
          dispatch(fetchAccountSessionsError(error.message));
        }
      )
  }

}









