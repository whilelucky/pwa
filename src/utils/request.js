/* eslint-disable no-param-reassign */
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

const request = async (url, data, opts) => {
  let fullUrl = url;

  if (opts.method === 'GET' && data) {
    const query = queryString.stringify(data, { arrayFormat: 'index' });
    fullUrl = `${url}?${query}`;
  }

  const options = {
    method: opts.method,
    body: opts.method !== 'GET' ? JSON.stringify(data) : null,
    credentials: opts.credentials || 'same-origin',
    headers: opts.headers || {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(fullUrl, options);
  const json = await response.json();
  return response.ok ? json : Promise.reject(json);
};

export const makeRequest = (baseUrl, options = {}) => ({
  raw: request,

  get(url, data, opts = options) {
    opts.method = 'GET';
    return request(`${baseUrl}${url}`, data, opts);
  },

  post(url, data, opts = options) {
    opts.method = 'POST';
    return request(`${baseUrl}${url}`, data, opts);
  },

  put(url, data, opts = options) {
    opts.method = 'PUT';
    return request(`${baseUrl}${url}`, data, opts);
  },

  delete(url, data, opts = options) {
    opts.method = 'DELETE';
    return request(url, data, opts);
  },
});

export default request;
