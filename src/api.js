import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://206.189.91.54/api/v1',
});

// Add an interceptor to set the authentication headers
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const expiry = localStorage.getItem('expiry');
  const uid = localStorage.getItem('uid');

  if (accessToken && client && expiry && uid) {
    config.headers['access-token'] = accessToken;
    config.headers.client = client;
    config.headers.expiry = expiry;
    config.headers.uid = uid;
  }

  return config;
});

export default api;
