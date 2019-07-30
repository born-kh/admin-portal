import * as types from "../constants/ActionType";
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
  return {
    type: types.LOGIN_ERROR,
    error

  };
}

export function logout() {
  return {
    type: types.LOGOUT,

  };
}

export function login(params) {
  return (dispatch) => {
    dispatch(loginPending());
    axios.post(types.USER_MANAGER_IP  + "/login", params).then((result) => {
      
      if (result.data.session !== undefined) {
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('profile', JSON.stringify(result.data.profile) );
        localStorage.setItem('session', JSON.stringify(result.data.session) );
        dispatch(loginSuccess(result.data))

      
        axios.post(types.USER_MANAGER_IP  + "/get/permission", result.data.session).then((result) => {

          if (result.status === 200) {
        
            
    
          }},(error) => {
            console.log(error)
    
          }
        )
       
       
      } else if (result.data !== undefined) {
         dispatch(loginError(result.data));
      }
    },
      (error) => {
        dispatch(loginError(error.message));
      }
    )

  }
}









