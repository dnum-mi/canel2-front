import axios from 'axios';
//axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.withCredentials = false;

const headers = {
  'Access-Control-Allow-Origin' : '*', 
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const header_csrf = {"X-CSRFTOKEN": "<csrf_token_very_long_string_goes_here>"}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL2 = process.env.REACT_APP_API_BASE_URL2;

export async function getData(endpoint) {
  return axios.get(`${API_BASE_URL}/${endpoint}`)
    .then(response => response.data);
};

export function postData(endpoint, data) {
  return axios.post(`${API_BASE_URL}/${endpoint}`, data)
    .then(response => response.data);
};

export function deleteData(endpoint, data) {
  return axios.delete(`${API_BASE_URL2}/${endpoint}`, data)
    .then(response => response.data);
};

export function updateData(endpoint, data) {
  return axios.put(`${API_BASE_URL2}/${endpoint}`, data)
    .then(response => response.data);
};