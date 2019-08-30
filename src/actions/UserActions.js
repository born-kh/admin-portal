import * as types from '../constants/actionType';
import { instance } from 'helpers';
import { SEARCH_USER } from 'constants/apiURL';
import { authHeader } from 'helpers/instance';

export function fetchUsersPending() {
  return {
    type: types.FETCH_USERS_PENDING
  };
}

export function fetchUsersSuccess(users) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    payload: users
  };
}

export function fetchUsersError(error) {
  return {
    type: types.FETCH_USERS_ERROR,
    error
  };
}

export function fetchUsers(params) {
  return dispatch => {
    dispatch(fetchUsersPending());
    instance.post(SEARCH_USER, params, { headers: authHeader() }).then(
      resp => {
        if (resp.data.accounts !== undefined) {
          return dispatch(fetchUsersSuccess(resp.data.accounts));
        } else {
          return dispatch(fetchUsersError(resp.data));
        }
      },
      error => {
        return dispatch(fetchUsersError(error.message));
      }
    );
  };
}
