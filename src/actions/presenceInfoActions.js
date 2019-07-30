import * as types from "../constants/ActionType";
import axios from 'axios';

export function presenceInfoPending() {
  return {
    type: types.FETCH_PRESENCE_INFO_PENDING

  };
}

export function presenceInfoSuccess(result) {

  return {
    type: types.FETCH_PRESENCE_INFO_SUCCESS,
    result

  };
}

export function presenceInfoError(error) {
  console.log(error);
  return {
    type: types.FETCH_PRESENCE_INFO_ERROR,
    error

  };
}





export function fetchPresenceInfo(params, sessionID) {
  return async (dispatch) => {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': sessionID,
    }

    dispatch(presenceInfoPending());
    await axios.post(types.USER_MANAGER_IP  + "/get/precense/info", params, { headers: headers }
    ).then((result) => {
      console.log("presence", result.data)

      if (result.data.result !== undefined) {
        console.log(result.data.result)
        dispatch(presenceInfoSuccess(result.data.result))
      } else if (result.data.error !== undefined) {
        dispatch(presenceInfoError(result.data.error.description));
      }
    },
      (error) => {
        console.log("error", error)
        dispatch(presenceInfoError(error.message));
      }
    )

  }
}






