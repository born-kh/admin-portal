import * as types from '../../constants/actionType';

const initState = {
  metaArray: [],
  pushArray: [],
  sockets: [],
  blockList: [],
  opts: [],
  suspended: [],
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
        metaArray: action.result.meta,
        blockList: action.result.blocklist,
        pushArray: action.result.push,
        sockets: action.result.sockets,
        opts: action.result.opts,
        suspended: action.result.suspended
      };
    case types.FETCH_ACCOUNT_SESSIONS_ERROR:
      return {
        ...state,

        pending: false,
        error: action.error
      };

    case types.UPDATE_TRACING:
      console.log('trae');

      let opts = [...state.opts];

      opts[action.params.index] = {
        ...opts[action.params.index],
        tracing: action.params.tracing
      };

      return {
        ...state,
        opts
      };

    case types.UPDATE_SUSPENDED:
      let suspended = [...state.suspended];

      suspended[action.params.index] = action.params.suspended;

      return {
        ...state,
        suspended
      };

    default:
      return state;
  }
};

export default sessionReducer;
