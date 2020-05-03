import * as types from 'constants/ActionType';

export function changeSearch(search) {
  return {
    type: types.CHANGE_SEARCH,
    payload: search
  };
}
