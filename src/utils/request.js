import axios from 'axios';
import { constants } from '../config';

let accessToken = '';

export const updateAccessToken = (token) => {
  accessToken = token;
}

const request = function (url, options = {}) {
  const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    ...options.headers,
    
  };

  const config = {
    method: options.method || 'GET',
    timeout: 5000,
    withCredentials: true,
    ...options,
    headers,
  };

  return new Promise((resolve, reject) => {
    axios({
      url: constants.serverUrl + url,
      ...config,
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data) {
            resolve(response.data);
            return;
          }
        }
        reject(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export default request;