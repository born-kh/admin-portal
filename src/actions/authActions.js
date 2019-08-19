import * as types from '../constants/actionType';
import { instance } from 'helpers';

export function loginPending() {
  return {
    type: types.LOGIN_PENDING
  };
}

export function loginSuccess(result) {
  return {
    type: types.LOGIN_SUCCESS,
    result
  };
}

export function loginError(error) {
  console.log(error);
  return {
    type: types.LOGIN_ERROR,
    error
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}

export function login(params) {
  return dispatch => {
    instance.post('/login', params).then(
      resp => {
        if (resp.data.session !== undefined) {
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('profile', JSON.stringify(resp.data.profile));
          localStorage.setItem('session', JSON.stringify(resp.data.session));
          dispatch(loginSuccess(resp.data));

          instance.post('/get/permission', resp.data.session).then(
            resp => {},
            error => {
              loginError(error.message);
            }
          );
        }
      },
      error => {
        dispatch(loginError(error.message));
      }
    );
  };
}
