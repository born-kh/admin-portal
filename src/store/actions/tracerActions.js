import * as types from 'constants/ActionType';
import { tracerAPI } from 'service/api';

export function fetchTracersPending() {
  return {
    type: types.FETCH_TRACERS_PENDING
  };
}

export function fetchTracersSuccess(messages, errors, accountID) {
  return {
    type: types.FETCH_TRACERS_SUCCESS,
    messages,
    errors,
    accountID
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
    dispatch(fetchTracersPending());

    tracerAPI
      .searchTracer(params)
      .then(response => {
        if (response.data.error === undefined) {
          var array = response.data;
          var arrayObj = [];
          var errors = [];

          var messages = [];

          array.forEach(item => {
            let rawPayload = item.payload.string.replace('', '');
            let payload = JSON.parse(rawPayload);

            const newItem = {
              ts: item.ts,

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
          });

          var accountId = '';
          arrayObj.forEach(val => {
            if (val.response.error !== undefined) {
              errors.push(val);
              accountId = val.account_id;
            } else if (val.response.result !== undefined) {
              messages.push(val);
            }
          });

          dispatch(fetchTracersSuccess(messages, errors, accountId));
        } else {
          dispatch(fetchTracersError(response.data.reason));
        }
      })
      .catch(error => {
        dispatch(fetchTracersError(''));
      });
  };
}
