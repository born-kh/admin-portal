import * as types from '../../constants/actionType';

const initState = {
  varStatus: null,
  permaStatus: null,
  activity: null,
  error: null,
  pending: false
};

const presenceInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_PRESENCE_INFO_PENDING:
      return {
        ...state,
        pending: true,
        error: null
      };
    case types.FETCH_ACCOUNT_SESSIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        varStatus: action.result.varStatus,
        permaStatus: action.result.permaStatus,
        activity: action.result.activity
      };
    case types.FETCH_ACCOUNT_SESSIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default presenceInfoReducer;
