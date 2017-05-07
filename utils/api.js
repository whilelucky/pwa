import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import config from '../config';

const handleResponse = (response) => (
  response.ok
    ? response.json()
    : response.json().then((error) => Promise.reject(error))
);

const fireRequest = (method, url, data) => {
  const fullUrl = `${config.apiUrl}${url}`;
  const options = {
    method,
    body: JSON.stringify(data),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(fullUrl, options).then(handleResponse);
};

export default {
  get(url, query) {
    const qs = queryString.stringify(query, { arrayFormat: 'index' });
    return fireRequest('GET', `${url}?${qs}`);
  },

  post(url, data) {
    return fireRequest('POST', url, data);
  },

  put(url, data) {
    return fireRequest('PUT', url, data);
  },

  delete(url) {
    return fireRequest('DELETE', url);
  },
};
