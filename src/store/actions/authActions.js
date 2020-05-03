import * as types from 'constants/ActionType';
import { permissionParams, PERMISSIONS } from 'constants/localStorage';

import { authAPI } from 'service/api';
import { axios } from 'helpers';

export function loginPending() {
  return {
    type: types.LOGIN_PENDING
  };
}

export function loginSuccess(user_data) {
  return {
    type: types.LOGIN_SUCCESS,
    user_data: user_data
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
        if (response !== undefined) {
          const user_session = response.data;
          localStorage.setItem(
            types.USER_SESSION,
            JSON.stringify(user_session)
          );
          const session_token = response.data.session_data.session_token;
          authAPI
            .getPermissions({
              permissions: permissionParams.permissions,
              metadata: {
                headers: { Authorization: session_token }
              }
            })
            .then(
              response => {
                if (response.data.result.data) {
                  localStorage.setItem(
                    PERMISSIONS,
                    JSON.stringify(response.data.result.data)
                  );

                  localStorage.setItem('isAuth', true);
                  dispatch(loginSuccess(user_session));
                }
              },
              error => {
                dispatch(loginError());
              }
            );
        } else {
          dispatch(loginError('response data is undifuned'));
        }
      })
      .catch(error => {
        console.log(error.status);
        if (error.response) {
          dispatch(loginError(error.response.data.reason));
        } else {
          dispatch(loginError(error.message));
        }
      });
  };
}

export function logout(params) {
  return dispatch => {
    authAPI
      .logout(params)
      .then(response => {
        localStorage.removeItem(types.USER_SESSION);
        localStorage.setItem('isAuth', false);
        dispatch(logoutSuccess());
      })
      .catch(error => {
        dispatch(logoutSuccess());
      });
  };
}

export const checkSessionToken = () => async dispatch => {
  dispatch({ type: types.CHECK_SESSION_TOKEN_REQUEST });
  try {
    const response = await axios.post('/refreshsession');
    console.log(response);
    if (response.data.result.data.authorization) {
      const user_session = localStorage.getItem(types.USER_SESSION);
      dispatch({
        type: types.CHECK_SESSION_TOKEN_SUCCESS,
        user_data: JSON.parse(user_session)
      });
    } else {
      new Error();
    }
  } catch (e) {
    localStorage.removeItem(types.USER_SESSION);
    localStorage.setItem('isAuth', false);
    dispatch({ type: types.CHECK_SESSION_TOKEN_FAILURE });
  }
};
