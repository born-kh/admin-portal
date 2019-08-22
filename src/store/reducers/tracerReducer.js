import * as types from '../../constants/actionType';

const initState = {
  errors: [],
  messages: [],
  accountId: '',
  pending: false,
  error: null
};

const tracerReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_TRACERS_PENDING:
      return {
        ...state,
        pending: true,
        error: null
      };
    case types.FETCH_TRACERS_SUCCESS:
      console.log(action);
      return {
        ...state,
        errors: action.errors,
        messages: action.messages,
        accountId: action.accountId,
        pending: false
      };
    case types.FETCH_TRACERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default tracerReducer;
