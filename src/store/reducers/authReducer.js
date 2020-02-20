import * as types from '../../constants/actionType';

const initState = {
  userData: null,
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

        userData: action.user_data,
        isAuth: true,
        pending: false
      };

    case types.CHECK_SESSION_TOKEN_REQUEST:
      return {
        ...state,
        pending: true
      };

    case types.CHECK_SESSION_TOKEN_FAILURE:
      return {
        ...state,
        pending: false
      };

    case types.CHECK_SESSION_TOKEN_SUCCESS:
      return {
        ...state,
        pending: false,
        isAuth: true,
        userData: action.user_data
      };

    case types.LOGIN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case types.LOGOUT:
      return initState;

    default:
      return state;
  }
};

export default authReducer;
