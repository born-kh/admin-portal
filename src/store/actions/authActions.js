import * as types from '../../constants/actionType';
import {
  PROFILE_DATA,
  SESSION_TOKEN,
  permissionParams,
  PERMISSIONS
} from 'constants/localStorage';

import { authAPI } from 'service/api';
import { conditionalExpression } from '@babel/types';

export function loginPending() {
  return {
    type: types.LOGIN_PENDING
  };
}

export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS,
    data
  };
}

export function loginError(error) {
  console.log(error);
  return {
    type: types.LOGIN_ERROR,
    error
  };
}

export function logoutSuccess() {
  return {
    type: types.LOGOUT
  };
}

export function permissionSuccess() {
  return {
    type: types.FETCH_PERMISSIONS_SUCCESS
  };
}

export function login(loginParams) {
  const params = {
    app_uuid: '3dedf9e6-d08b-7cf6-c6e0-4b33e10d4197',
    domain: 'mgr.nexustls.com',
    force_session: false,
    password: loginParams.password,
    project_uuid: null,
    user_headers: {},
    user_ip: '1.2.3.4',
    username: loginParams.username
  };

  return dispatch => {
    dispatch(loginPending());
    authAPI
      .login(params)
      .then(response => {
        if (response !== undefined) {
          const session_data = response.data.session_data;
          const profile_data = response.data.profile_data;
          const permissions = {};
          dispatch(loginSuccess(response.data));

          localStorage.setItem(SESSION_TOKEN, session_data.session_token);
          localStorage.setItem(PROFILE_DATA, JSON.stringify(profile_data));
          localStorage.setItem('isAuth', true);

          authAPI.getPermissions(permissionParams).then(
            response => {
              localStorage.setItem(
                PERMISSIONS,
                JSON.stringify(response.data.result.permissions)
              );
              console.log(JSON.parse(localStorage.getItem(PERMISSIONS)));
              dispatch(permissionSuccess());
            },
            error => {
              dispatch(loginError(error.message));
            }
          );
        }
      })
      .catch(error => {
        dispatch(loginError(error.message));
      });
  };
}

export function logout(params) {
  return dispatch => {
    authAPI
      .logout(params)
      .then(response => {
        dispatch(logoutSuccess());
      })
      .catch(error => {
        console.log('error', error);
        dispatch(logoutSuccess());
      });
  };
}
