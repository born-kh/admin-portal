import * as types from "../constants/ActionType";

export function changeSearch(search) {
  console.log("search", search)

    return {
      type: types.CHANGE_SEARCH,
      payload: search
      
    };
  }