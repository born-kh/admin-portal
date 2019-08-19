import * as types from '../constants/actionType';
import { instance } from 'helpers';

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
    instance.post('/search/user', params).then(
      resp => {
        if (resp.data.result !== undefined) {
          console.log(resp);
          return dispatch(fetchUsersSuccess(resp.data.result.accounts));
        } else {
          return dispatch(fetchUsersError(resp.data.error.description));
        }
      },
      error => {
        return dispatch(fetchUsersError(error.message));
      }
    );
  };
}
