import * as types from '../constants/actionType';
import { instance } from 'helpers';
import {
  LOGIN,
  GET_PERMISSIONS,
  GET_PROFILE_DATA,
  LOGOUT
} from 'constants/apiURL';
import { SESSION_DATA, PROFILE_DATA } from 'constants/localStorage';
import { authHeader } from 'helpers/instance';

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

export function login() {
  const params = {
    app_uuid: '3dedf9e6-d08b-7cf6-c6e0-4b33e10d4197',
    domain: 'mgr.nexustls.com',
    force_session: false,
    password: 'fua9ijeimaeYoogh',
    project_uuid: null,
    user_headers: {},
    user_ip: '1.2.3.4',
    username: 'mgrtester'
  };

  return dispatch => {
    dispatch(loginPending());
    instance.post(LOGIN, params).then(
      resp => {
        console.log(resp);
        if (resp.data !== undefined) {
          const session_data = resp.data.session_data;
          const profile_data = resp.data.profile_data;
          const permissions = {};
          localStorage.setItem(SESSION_DATA, JSON.stringify(session_data));
          localStorage.setItem(PROFILE_DATA, JSON.stringify(profile_data));
          dispatch(loginSuccess(resp.data));

          let permissionParams = {
            permissions: [
              'ACC_GET_PRESENCE_INFO',
              'ACC_SUSPEND_SESSION',
              'ACC_GET_SESSIONS',
              'ACC_REMOVE_SESSION',
              'ACC_SET_TRACER',
              'ACC_SEARCH_TRACER',
              'ACC_REMOVE_TRACER',
              'ACC_SEARCH_USER',
              'ACC_SET_PASSWORD'
            ]
          };

        
          instance
            .post(GET_PERMISSIONS, permissionParams, { headers: authHeader() })
            .then(
              resp => {
                console.log('permission', resp);
                // history.push('/users');
              },
              error => {}
            );
        }
      },
      error => {
        dispatch(loginError(error.message));
      }
    );
  };
}

export function logout(params) {
  return dispatch => {
    instance.post(LOGOUT, params).then(
      resp => {
        dispatch(logoutSuccess());
      },
      error => {}
    );
  };
}
