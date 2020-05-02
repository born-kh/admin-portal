import * as types from '../../constants/actionType';
import { tracerAPI } from 'service/api';
import { errorMessage } from 'helpers/errorMessage';

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
        console.log(response);
        if (response.data.error === undefined) {
          var array = response.data;
          var arrayObj = [];
          var errors = [];
          console.log(array);
          var messages = [];
          array.map(item => {
            console.log(item);
            let rawPayload = item.payload.string.replace('', '');
            let payload = JSON.parse(rawPayload);

            console.log(payload);
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
          arrayObj.map(val => {
            if (val.response.error !== undefined) {
              errors.push(val);
              accountId = val.account_id;
            } else if (val.response.result !== undefined) {
              messages.push(val);
            }
          });
          console.log(messages);
          dispatch(fetchTracersSuccess(messages, errors, accountId));
        } else {
          console.log(123);
          dispatch(fetchTracersError(response.data.reason));
        }
      })
      .catch(error => {
        dispatch(fetchTracersError(''));
      });
  };
}
