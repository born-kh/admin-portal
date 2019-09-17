import * as types from '../../constants/actionType';
import { userAPI } from 'service/api';

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

    userAPI
      .searchUser(params)
      .then(response => {
        console.log('searchUser', response);
        if (response.data.accounts !== undefined) {
          return dispatch(fetchUsersSuccess(response.data.accounts));
        } else {
          return dispatch(fetchUsersError(response.data));
        }
      })
      .catch(error => {
        console.log('error', error);
        return dispatch(fetchUsersError(error.message));
      });
  };
}
