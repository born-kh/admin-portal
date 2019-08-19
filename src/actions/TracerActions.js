import * as types from '../constants/actionType';
import { instance } from 'helpers';

export function fetchTracersPending() {
  return {
    type: types.FETCH_TRACERS_PENDING
  };
}

export function fetchTracersSuccess(messages, errors, accountId) {
  return {
    type: types.FETCH_TRACERS_SUCCESS,
    messages,
    errors,
    accountId
  };
}

export function fetchTracersError(error) {
  return {
    type: types.FETCH_TRACERS_ERROR,
    error
  };
}

export function fetchTracers(params) {
  return dispatch => {
    instance.post('/get/precense/info', params).then(
      resp => {
        if (resp.data.error === undefined) {
          var array = resp.data;
          console.log('resp', resp);
          var arrayObj = [];
          var errors = [];
          var messages = [];
          array.map(item => {
            let rawPayload = item.payload.replace('', '');
            let payload = JSON.parse(rawPayload);

            const newItem = {
              ts: `${new Date(item.ts).getHours().toString()}:${new Date(
                item.ts
              )
                .getMinutes()
                .toString()}:${new Date(item.ts).getSeconds().toString()}`,
              account_id: item.account_id,
              session_id: item.session_id,
              response: { id: null },
              request: { id: null }
            };
            if (payload.params !== undefined) {
              const index = arrayObj
                .map(e => e.response.id)
                .indexOf(payload.id);
              newItem.request = payload;
              if (index < 0) {
                arrayObj.push(newItem);
              } else {
                arrayObj[index].request = payload;
              }
            } else {
              const index = arrayObj.map(e => e.request.id).indexOf(payload.id);
              newItem.response = payload;
              if (index < 0) {
                arrayObj.push(newItem);
              } else {
                arrayObj[index].response = payload;
              }
            }
            return true;
          });
          var accountId = '';
          arrayObj.map((val, key) => {
            if (val.response.error !== undefined) {
              errors.push(val);
              accountId = val.account_id;
            } else if (val.response.result !== undefined) {
              messages.push(val);
            }
            return true;
          });
          dispatch(fetchTracersSuccess(messages, errors, accountId));
        } else {
          dispatch(fetchTracersError(resp.data.reason));
        }
      },
      error => {
        dispatch(fetchTracersError(error.message));
      }
    );
  };
}
