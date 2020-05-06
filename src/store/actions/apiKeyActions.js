import * as types from 'constants/ActionType';
import { apiKeyAPI } from 'service/api';

export const fetchApiKeysPending = () => {
  return {
    type: types.FETCH_APIKEYS_PENDING
  };
};

export const fetchApiKeysSuccess = data => {
  return {
    type: types.FETCH_APIKEYS_SUCCESS,
    payload: data
  };
};

export const fetchApiKeysError = error => {
  return {
    type: types.FETCH_APIKEYS_ERROR,
    payload: error
  };
};

export const createApiKeyPending = () => {
  return {
    type: types.CREATE_APIKEY_PENDING
  };
};

export const createApiKeySuccess = data => {
  return {
    type: types.CREATE_APIKEY_SUCCESS,
    payload: data
  };
};
export const createApiKeyError = error => {
  return {
    type: types.CREATE_APIKEY_ERROR,
    payload: error
  };
};

export function updateApikey(params) {
  return {
    type: types.UPDATE_APIKEY,
    payload: params
  };
}

export const fetchApiKeys = () => {
  return dispatch => {
    dispatch(fetchApiKeysPending());

    apiKeyAPI
      .getApiKeys()
      .then(response => {
        dispatch(fetchApiKeysSuccess(response.data.apiKeys));
      })
      .catch(error => {
        dispatch(fetchApiKeysError('error'));
      });
  };
};

export const createApiKey = params => {
  return dispatch => {
    dispatch(fetchApiKeysPending());
    apiKeyAPI
      .createApiKey(params)
      .then(response => {
        if (response.data.message === 'Success') {
          dispatch(createApiKeySuccess(response.data.apiKey));
        } else {
          dispatch(createApiKeyError('error'));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(createApiKeyError('error'));
      });
  };
};
