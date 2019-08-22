import axios from 'axios';
import { baseURL } from 'constants/apiURL';
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
