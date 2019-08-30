import * as types from '../constants/actionType';
import { instance } from 'helpers';
import { GET_PRECENSE_INFO } from 'constants/apiURL';
import { authHeader } from 'helpers/instance';

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
    dispatch(presenceInfoPending());
    instance.post(GET_PRECENSE_INFO, params, { headers: authHeader() }).then(
      resp => {
        if (resp.data.varStatus !== undefined) {
          dispatch(presenceInfoSuccess(resp.data));
        } else if (resp.data.error !== undefined) {
          dispatch(presenceInfoSuccess(resp.data.error));
        }
      },
      error => {
        dispatch(presenceInfoError(error.message));
      }
    );
  };
}
