import * as types from '../../constants/actionType';

let profil = JSON.parse(localStorage.getItem('profile'));
let auth = localStorage.getItem('isAuthenticated');
let session = JSON.parse(localStorage.getItem('session'));

const initState = auth
  ? {
      profile: profil,
      session: session,
      error: null,
      pending: false
    }
  : {
      profile: null,
      session: null,
      error: null,
      pending: false
    };

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_PENDING:
      return {
        ...state,
        pending: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        profile: action.result.profile,
        session: action.result.session
      };

    case types.LOGIN_ERROR:
      console.log(action);
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case types.LOGOUT:
      return {
        profile: null,
        session: null,
        error: null,
        pending: false
      };

    default:
      return state;
  }
};

export default authReducer;
