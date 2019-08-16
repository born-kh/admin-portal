import * as types from '../constants/ActionType';
import axios from 'axios';

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
  return async dispatch => {
    dispatch(loginPending());

    try {
      const res = await axios.post(types.USER_MANAGER_IP + '/login', params);
      if (res.data.session !== undefined) {
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('profile', JSON.stringify(res.data.profile));
        localStorage.setItem('session', JSON.stringify(res.data.session));
        dispatch(loginSuccess(res.data));

        try {
          const permissionRes = await axios.post(
            types.USER_MANAGER_IP + '/get/permission',
            res.data.session
          );
          if (permissionRes.status === 200) {
            console.log(permissionRes.data);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (res.data !== undefined) {
        dispatch(loginError(res.data));
      }
    } catch (error) {
      dispatch(loginError(error.message));
    }
  };
}
