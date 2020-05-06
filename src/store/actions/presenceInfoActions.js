import * as types from 'constants/ActionType';
import { presenceAPI } from 'service/api';

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
  return {
    type: types.FETCH_PRESENCE_INFO_ERROR,
    error
  };
}

export function fetchPresenceInfo(params) {
  return dispatch => {
    dispatch(presenceInfoPending());
    presenceAPI
      .getPresenceInfo(params)
      .then(response => {
        if (response.data.varStatus !== undefined) {
          dispatch(presenceInfoSuccess(response.data));
        } else if (response.data.error !== undefined) {
          dispatch(presenceInfoSuccess(response.data.error));
        }
      })
      .catch(error => {
        dispatch(presenceInfoError(''));
      });
  };
}
