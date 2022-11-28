
import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_API_BASE}:${process.env.REACT_APP_API_PORT || 3000}`;
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});