import * as types from '../../constants/actionType';
import { PROFILE_DATA, SESSION_DATA } from 'constants/localStorage';

let profile_data = JSON.parse(localStorage.getItem(PROFILE_DATA));
// let session_data = JSON.parse(localStorage.getItem(SESSION_DATA));
let session_data = null;
let isAuth = localStorage.getItem('isAuth');

const initState = profile_data
  ? {
      profile_data: profile_data,
      session_data: session_data,
      error: null,
      pending: false,
      isAuth: isAuth
    }
  : {
      profile_data: null,
      session_data: null,
      error: null,
      pending: false,
      isAuth: false
    };

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_PENDING:
      return {
        ...state,
        error: null,
        pending: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,

        profile_data: action.data.profile_data,
        session_data: action.data.session_data
      };

    case types.LOGIN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case types.LOGOUT:
      return {
        profile_data: null,
        session_data: null,
        error: null,
        pending: false,
        isAuth: false
      };

    case types.FETCH_PERMISSIONS_SUCCESS:
      return {
        pending: false,
        isAuth: true
      };

    default:
      return state;
  }
};

export default authReducer;
