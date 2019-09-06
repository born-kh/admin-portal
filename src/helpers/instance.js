import axios from 'axios';
import { baseURL } from 'constants/apiURL';
import { SESSION_DATA, SESSION_TOKEN } from 'constants/localStorage';

export function authHeader() {
  let session_token = JSON.parse(localStorage.getItem(SESSION_TOKEN));
  if (session_token) {
    return { Authorization: session_token };
  } else {
    return {};
  }
}

export const instance = axios.create({
  baseURL: baseURL,
  headers: authHeader()
});
