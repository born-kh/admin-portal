import * as types from 'constants/ActionType';
import { userAPI, passportAPI } from 'service/api';

export function fetchUsersPending() {
  return {
    type: types.FETCH_USERS_PENDING
  };
}

export function fetchUsersSuccess(users) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    users
  };
}

export function fetchUsersError(error) {
  return {
    type: types.FETCH_USERS_ERROR,
    error
  };
}

export function fetchUsers(paramsList) {
  return async dispatch => {
    dispatch(fetchUsersPending());
    var users = [];

    try {
      for (let params of paramsList) {
        let response = await userAPI.searchUser(params);
        if (response.data.accounts !== undefined) {
          users = users.concat(response.data.accounts);
        }
      }
    } catch (e) {}
    return dispatch(fetchUsersSuccess(users));
  };
}

export function fetchApplicationsByAccountPending() {
  return {
    type: types.FETCH_APPLICATIONS_BY_ACCOUNT_PENDING
  };
}

export function fetchApplicationsByAccountSuccess(applications) {
  return {
    type: types.FETCH_APPLICATIONS_BY_ACCOUNT_SUCCESS,
    applications
  };
}

export function fetchApplicationsByAccountError(error) {
  return {
    type: types.FETCH_APPLICATIONS_BY_ACCOUNT_ERROR,
    error
  };
}

export function fetchApplicationsByAccount(params) {
  return dispatch => {
    dispatch(fetchApplicationsByAccountPending());
    passportAPI
      .getApplicationByAccount(params)
      .then(response => {
        if (response.data !== undefined) {
          return dispatch(
            fetchApplicationsByAccountSuccess(response.data.applications)
          );
        } else {
          return dispatch(fetchApplicationsByAccountError(response.data));
        }
      })
      .catch(error => {
        return dispatch(fetchApplicationsByAccountError(''));
      });
  };
}
