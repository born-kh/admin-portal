import * as types from '../../constants/actionType';
import {
  PROFILE_DATA,
  SESSION_TOKEN,
  permissionParams,
  PERMISSIONS,
  SESSION_DATA
} from 'constants/localStorage';

import { authAPI } from 'service/api';

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
        console.log(response);
        console.log(response);
        if (response !== undefined) {
          const session_data = response.data.session_data;
          const profile_data = response.data.profile_data;
          const auth_data = response.data;
          localStorage.setItem(SESSION_TOKEN, session_data.session_token);
          localStorage.setItem(SESSION_DATA, JSON.stringify(session_data));
          localStorage.setItem(PROFILE_DATA, JSON.stringify(profile_data));
          localStorage.setItem('isAuth', true);

          authAPI
            .getPermissions({
              permissions: permissionParams.permissions,
              metadata: {
                headers: { 'X-Auth-Token': session_data.session_token }
              }
            })
            .then(
              response => {
                console.log(response);
                console.log(response.data.result.data);

                for (var type in response.data.result.data) {
                  console.log(type);
                }
                localStorage.setItem(
                  PERMISSIONS,
                  JSON.stringify(response.data.result.data)
                );
                if (response.data.result.data) {
                  dispatch(loginSuccess(auth_data));
                }
              },
              error => {
                dispatch(loginError(error.message));
              }
            );
        } else {
          dispatch(loginError(''));
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(loginError('Wrong login or password.'));
      });
  };
}

export function logout(params) {
  return dispatch => {
    authAPI
      .logout(params)
      .then(response => {
        if (response.status) {
          localStorage.clear();
          dispatch(logoutSuccess());
        }
      })
      .catch(error => {
        dispatch(logoutSuccess());
      });
  };
}
