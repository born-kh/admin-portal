import * as types from 'constants/ActionType';

const initState = {
  search: ''
};

const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case types.CHANGE_SEARCH:
      return {
        search: action.payload
      };
    default:
      return state;
  }
};

export default settingsReducer;
