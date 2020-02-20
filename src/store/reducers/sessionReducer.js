import * as types from '../../constants/actionType';

const initState = {
  sessions: [],
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
        error: null,
        sessions: action.sessions,
        blockList: action.blocklist
      };
    case types.FETCH_ACCOUNT_SESSIONS_ERROR:
      return {
        ...state,

        pending: false,
        error: action.error,
        sessions: [],
        blockList: []
      };

    case types.UPDATE_TRACING:
      var sessions = [...state.sessions];
      sessions[action.params.index].options = {
        ...sessions[action.params.index].options,
        tracing: action.params.tracing
      };

      return {
        ...state,
        sessions
      };

    case types.UPDATE_SUSPENDED:
      sessions = [...state.sessions];
      sessions[action.params.index].isSuspended = action.params.isSuspended;
      return {
        ...state,
        sessions
      };

    case types.SESSION_DELETE:
      sessions = [...state.sessions];
      sessions = sessions.filter(
        session => session.meta.sessionID !== action.sessionID
      );

      return {
        ...state,
        sessions
      };

    default:
      return state;
  }
};

export default sessionReducer;
