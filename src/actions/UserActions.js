import * as types from '../constants/ActionType';
import axios from 'axios';

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

export function fetchUsers(params, sessionID) {
  return async dispatch => {
    var headers = {
      Authorization: sessionID
    };
    dispatch(fetchUsersPending());

    try {
      const res = await axios.post(
        types.USER_MANAGER_IP + '/search/user',
        params,
        { headers: headers }
      );
      if (res.data.result !== undefined) {
        return dispatch(fetchUsersSuccess(res.data.result.accounts));
      } else {
        return dispatch(fetchUsersError(res.data.error.description));
      }
    } catch (error) {
      return dispatch(fetchUsersError(error.message));
    }
  };
}
