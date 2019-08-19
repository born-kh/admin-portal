import { baseURL } from 'constants/actionType';
import axios from 'axios';
let session = JSON.parse(localStorage.getItem('session'));
export function authHeader() {
  if (session && session.id) {
    return { Authorization: session.id };
  } else {
    return {};
  }
}

export const instance = axios.create({
  baseURL: baseURL,
  headers: authHeader()
});
