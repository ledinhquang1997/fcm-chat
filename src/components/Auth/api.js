import request from '../../utils/request';

export const login = (username, password) => {
  const data = {
    mobile_number: username,
    password: password,
  };

  var options = {
    data,
    method: 'post',
  };

  return request('/v1/members/me/access-token', options);
};

export const getMyInfo = () => {
  return request('/v1/members/me');
}

export const logoutRequest = (registrationToken) => {
  return request('/v1/members/me/access-token', {
    data: {
      registration_token: registrationToken
    },
    method: 'put'
  })
}