import * as types from 'constants/ActionType';

const initState = {
  users: [],
  applications: [],
  error: null,
  pending: false,
  pendingApplication: false,
  errorApplication: null
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_USERS_PENDING:
      return {
        ...state,
        users: [],
        error: null,
        pending: true
      };
    case types.FETCH_USERS_SUCCESS:
      console.log(action.users);
      let users = action.users.reduce((unique, o) => {
        if (!unique.some(obj => obj.accountID === o.accountID)) {
          unique.push(o);
        }
        return unique;
      }, []);
      console.log(users);
      return {
        ...state,
        pending: false,
        error: null,
        users: users
      };
    case types.FETCH_USERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    case types.FETCH_APPLICATIONS_BY_ACCOUNT_PENDING:
      return {
        ...state,
        applications: [],
        errorApplication: null,
        pendingApplication: true
      };
    case types.FETCH_APPLICATIONS_BY_ACCOUNT_SUCCESS:
      return {
        ...state,
        pendingApplication: false,
        applications: action.applications
      };
    case types.FETCH_APPLICATIONS_BY_ACCOUNT_ERROR:
      return {
        ...state,
        pendingApplication: false,
        errorApplication: action.error
      };

    default:
      return state;
  }
};

export default userReducer;
