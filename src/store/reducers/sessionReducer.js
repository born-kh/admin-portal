import * as types from '../../constants/actionType';

const initState = {
  sessionDataArray: [],
  blockList: [],
  error: null,
  pending: false
};

const sessionReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_ACCOUNT_SESSIONS_PENDING:
      return {
        ...state,

        pending: true,
        error: null
      };
    case types.FETCH_ACCOUNT_SESSIONS_SUCCESS:
      return {
        ...state,

        pending: false,
        sessionDataArray: action.result.sessionDataArray,
        blockList: action.result.blocklist
      };
    case types.FETCH_ACCOUNT_SESSIONS_ERROR:
      return {
        ...state,

        pending: false,
        error: action.error
      };

    case types.UPDATE_TRACING:
      let sessionDataArray = [...state.sessionDataArray];

      sessionDataArray[action.params.index].opts = {
        ...sessionDataArray[action.params.index].opts,
        tracing: action.params.tracing
      };

      return {
        ...state,
        sessionDataArray
      };

    case types.UPDATE_SUSPENDED:
      sessionDataArray = [...state.sessionDataArray];

      sessionDataArray[action.params.index].suspended = action.params.suspended;

      return {
        ...state,
        sessionDataArray
      };

    default:
      return state;
  }
};

export default sessionReducer;
