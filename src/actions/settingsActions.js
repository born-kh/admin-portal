import * as types from '../constants/actionType';

export function changeSearch(search) {
  return {
    type: types.CHANGE_SEARCH,
    payload: search
  };
}
