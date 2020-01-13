import * as types from '../../constants/actionType';

const initState = {
  users: [],
  applications: [],
  searchApplications: [],
  errorUser: null,
  pendingUser: false,
  errorApplication: null,
  pendingApplication: false
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_USERS_PENDING:
      return {
        ...state,
        users: [],

        errorUser: null,
        pendingUser: true
      };
    case types.FETCH_USERS_SUCCESS:
      console.log(action.payload);
      let users = action.payload.filter(
        (elem, index, self) =>
          self.findIndex(t => {
            console.log(elem);
            if (elem !== undefined || t !== undefined) {
              return t.accountID === elem.accountID;
            }
          }) === index
      );

      return {
        ...state,
        pendingUser: false,
        users: users
      };
    case types.FETCH_USERS_ERROR:
      return {
        ...state,
        pendingUser: false,
        errorUser: action.error
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
        applications: action.payload
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
