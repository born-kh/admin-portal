import * as types from '../constants/ActionType';
import axios from 'axios';

export function presenceInfoPending() {
  return {
    type: types.FETCH_PRESENCE_INFO_PENDING
  };
}

export function presenceInfoSuccess(result) {
  return {
    type: types.FETCH_PRESENCE_INFO_SUCCESS,
    result
  };
}

export function presenceInfoError(error) {
  console.log(error);
  return {
    type: types.FETCH_PRESENCE_INFO_ERROR,
    error
  };
}

export function fetchPresenceInfo(params, sessionID) {
  return async dispatch => {
    var headers = {
      Authorization: sessionID
    };

    try {
      const res = await axios.post(
        types.USER_MANAGER_IP + '/get/precense/info',
        params,
        { headers: headers }
      );

      if (res.data.result !== undefined) {
        dispatch(presenceInfoSuccess(res.data.result));
      } else if (res.data.error !== undefined) {
        dispatch(presenceInfoSuccess(res.data.error.description));
      }
    } catch (error) {
      dispatch(presenceInfoError(error.message));
    }
  };
}
