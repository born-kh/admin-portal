import * as types from '../../constants/actionType';
import { userAPI, passportAPI } from 'service/api';
import { errorMessage } from 'helpers/errorMessage';

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

export function fetchUsers(paramsList) {
  return dispatch => {
    dispatch(fetchUsersPending());
    var users = paramsList.map(function(params) {
      return userAPI
        .searchUser(params)
        .then(response => {
          if (response.data.accounts !== undefined) {
            for (let i = 0; i < response.data.accounts.length; i++) {
              console.log('123455');
              return response.data.accounts[i];
            }
          } else {
            return null;
            // return dispatch(fetchUsersError(response.data));
          }
        })
        .catch(error => {
          return null;
          // return dispatch(fetchUsersError(errorMessage(error)));
        });
    });
    Promise.all(users).then(function(results) {
      console.log(results);
      const result = results.filter(item => {
        console.log(item);
        return item ? item : '';
      });
      console.log(result);
      return dispatch(fetchUsersSuccess(result));
    });
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
    payload: applications
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
        console.log(response);
        if (response.data !== undefined) {
          return dispatch(
            fetchApplicationsByAccountSuccess(response.data.applications)
          );
        } else {
          return dispatch(fetchApplicationsByAccountError(response.data));
        }
      })
      .catch(error => {
        return dispatch(fetchApplicationsByAccountError(errorMessage(error)));
      });
  };
}
