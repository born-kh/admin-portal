import * as types from '../../constants/actionType';

const initState = {
  search: '12312312323131'
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
