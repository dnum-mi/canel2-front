import axios from 'axios';

const header_csrf = {"X-CSRFTOKEN": "<csrf_token_very_long_string_goes_here>"}

export const API_BASE_URL = 'http://localhost:8000/canel/api/v1';
export const API_BASE_URL2 = 'http://localhost:8000';
// export const API_BASE_URL = 'http://canel2.apps.ocp4-8.infocepo.com/canel/api/v1';
// export const API_BASE_URL2 = 'http://canel2.apps.ocp4-8.infocepo.com';
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const API_BASE_URL2 = process.env.REACT_APP_API_BASE_URL2;

const headers = {
  'Content-Type': 'application/json'
}

export async function getData(endpoint) {
  return axios.get(`${API_BASE_URL}/${endpoint}`)
    .then(response => response.data);
};  

export function postData(endpoint, data) {
  return axios.post(`${API_BASE_URL}/${endpoint}`, data, {headers : headers})
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