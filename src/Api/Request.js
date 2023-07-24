import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/canel/api/v1';

export async function getToken(username, password) {
  const data = {
    username: username,
    password: password
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': 'ye6nh3TEhXPAdKW1ptsO8kFD1wJSSiXCWzE2ue4NU3vej3J86ISsX9kLcme3aIS9'
    },
    body: JSON.stringify(data)
  };

   const response = await fetch('http://localhost:8000/api/token/', requestOptions)
   const jsonresponse = await response.json()
   return jsonresponse
    // .then(response => {
    //   return response.json()
    // }
      // if (!response.ok) {
      //   throw new Error('Request failed with status code ' + response.status);
      // }
      // else{
      //   return response.data
      // }
    // )
  

    // .catch(error => {
    //   console.error('Error:', error);
    //   throw error;
    // });
}

export function storeTokens(tokens) {
  localStorage.setItem('token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
}

export function getData(endpoint) {
  const accessToken = localStorage.getItem("token");
  console.log("test", localStorage.getItem("token"))
  for (let i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}
  const headers = {
    'X-CSRFToken': getCSRFToken(),
    'Authorization': `Bearer ${accessToken}`
  };

  return axios.get(`${API_BASE_URL}/${endpoint}`, { headers })
    .then(response => response.data);
}

export function postData(endpoint, data) {
  const accessToken = localStorage.getItem('token');
  const headers = {
    'X-CSRFToken': getCSRFToken(),
    'Authorization': `Bearer ${accessToken}`
  };

  return axios.post(`${API_BASE_URL}/${endpoint}`, data, { headers })
    .then(response => response.data);
}

export function deleteData(endpoint, data) {
  const accessToken = localStorage.getItem('token');
  const headers = {
    'X-CSRFToken': getCSRFToken(),
    'Authorization': `Bearer ${accessToken}`
  };

  return axios.delete(`${API_BASE_URL}/${endpoint}`, { headers, data })
    .then(response => response.data);
}

export function updateData(endpoint, data) {
  const accessToken = localStorage.getItem('access_token');
  const headers = {
    'X-CSRFToken': getCSRFToken(),
    'Authorization': `Bearer ${accessToken}`
  };

  return axios.put(`${API_BASE_URL}/${endpoint}`, data, { headers })
    .then(response => response.data);
}

function getCSRFToken() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    return Promise.resolve('<csrf_token_very_long_string_goes_here>');
  }

  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  return axios.get(`${API_BASE_URL}/csrf/`, { headers })
    .then(response => response.data.csrf_token)
    .catch(error => {
    console.error('Erreur lors de la récupération du token CSRF:', error);
    return '<csrf_token_very_long_string_goes_here>';
  });
}

