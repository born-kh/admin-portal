import * as types from 'constants/ActionType';

const initialState = {
  pending: false,
  apiKeys: [],
  error: null
};

const apiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_APIKEYS_PENDING:
      return {
        ...state,
        pending: true
      };
    case types.FETCH_APIKEYS_SUCCESS:
      return {
        ...state,
        pending: false,
        apiKeys: action.payload
      };
    case types.FETCH_APIKEYS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    case types.CREATE_APIKEY_SUCCESS:
      return {
        ...state,
        pending: false,
        apikeys: [...state.apiKeys].concat(action.payload)
      };
    case types.CREATE_APIKEY_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    case types.UPDATE_APIKEY:
      let apiKeys = [...state.apiKeys];
      apiKeys[action.payload.index].enabled = action.payload.enabled;

      return {
        ...state,
        apiKeys
      };
    default:
      return state;
  }
};

export default apiKeyReducer;
