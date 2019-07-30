import * as types from "../constants/ActionType";
import axios from 'axios';

export function fetchUsersPending() {
  return {
    type: types.FETCH_USERS_PENDING,

  };
}

export function fetchUsersSuccess(users) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    payload: users

  };
}

export function fetchUsersError(error) {
  return {
    type: types.FETCH_USERS_ERROR,
    error

  };
}


export function fetchUsers(params, sessionID) {
  return (dispatch) => {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': sessionID,
    }
    dispatch(fetchUsersPending());
    axios.post(types.USER_MANAGER_IP + "/search/user", params, { headers: headers }).then((result) => {
      dispatch(fetchUsersSuccess(result.data.result.accounts))
      
    },
      (error) => {
        dispatch(fetchUsersError(error.message));
      }
    )
  }

}








