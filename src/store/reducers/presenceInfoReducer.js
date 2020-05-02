import * as types from '../../constants/actionType';

const initState = {
  presenceInfo: {},

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
    case types.FETCH_PRESENCE_INFO_SUCCESS:
      return {
        ...state,
        pending: false,
        presenceInfo: action.result
      };
    case types.FETCH_PRESENCE_INFO_ERROR:
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
