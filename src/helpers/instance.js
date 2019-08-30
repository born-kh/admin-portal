import axios from 'axios';
import { baseURL } from 'constants/apiURL';
import { SESSION_DATA } from 'constants/localStorage';

export function authHeader() {
  let session_data = JSON.parse(localStorage.getItem(SESSION_DATA));
  if (session_data && session_data.session_token) {
    return { Authorization: session_data.session_token };
  } else {
    return {};
  }
}

export const instance = axios.create({
  baseURL: baseURL,
  headers: authHeader()
});
