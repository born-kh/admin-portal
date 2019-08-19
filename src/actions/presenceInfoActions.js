import * as types from '../constants/actionType';
import { instance } from 'helpers';

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

export function fetchPresenceInfo(params) {
  return dispatch => {
    instance.post('/get/precense/info', params).then(
      resp => {
        if (resp.data.result !== undefined) {
          dispatch(presenceInfoSuccess(resp.data.result));
        } else if (resp.data.error !== undefined) {
          dispatch(presenceInfoSuccess(resp.data.error.description));
        }
      },
      error => {
        dispatch(presenceInfoError(error.message));
      }
    );
  };
}
