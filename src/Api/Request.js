import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const API_BASE_URL = 'http://canel2.apps.ocp4-8.infocepo.com/canel/api/v1';
// export const API_BASE_URL2 = 'http://192.168.8.72:8000';

export async function getData(endpoint) {
  return axios.get(`${API_BASE_URL}/${endpoint}`, { headers })
    .then(response => response.data);
};

export function postData(endpoint, data) {
  return axios.post(`${API_BASE_URL}/${endpoint}`, data, { headers })
    .then(response => response.data);
};

export function deleteData(endpoint, data) {
  return axios.delete(`${API_BASE_URL}/${endpoint}`, data, { headers })
    .then(response => response.data);
};

export function updateData(endpoint, data) {
  return axios.put(`${API_BASE_URL}/${endpoint}`, data, { headers })
    .then(response => response.data);
};
