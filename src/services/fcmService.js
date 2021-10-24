import {getMessaging, getToken, deleteToken} from 'firebase/messaging';
import request from '../utils/request';

export const generateNewToken = async (callback) => {
  try {
    const messaging = getMessaging();
    await deleteToken(messaging);
    const currentToken = await getToken(messaging);
    callback(currentToken);
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
  }
};

export const getRegistrationToken = async () => {
  try {
    const messaging = getMessaging();
    const currentToken = await getToken(messaging);
    return currentToken;
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
  }
}

export const deleteCurrentRegistrationToken = async () => {
  try {
    const messaging = getMessaging();
    await deleteToken(messaging);
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
  }
}

export const sendTokenToServer = async (registrationToken) => {
  try {
    const options = {
      data: {
        registration_token: registrationToken,
      },
      method: 'post',
    };
    const response = await request('/v1/chat/registration_token', options);
    if (response && response.registrationToken) {
      return {
        registrationToken: response.registrationToken,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendCurrentTokenToServer = async () => {
  const messaging = getMessaging();
  const currentToken = await getToken(messaging);
  try {
    const options = {
      data: {
        registration_token: currentToken,
      },
      method: 'post',
    };
    const response = await request('/v1/chat/registration_token', options);
    if (response && response.registrationToken) {
      return {
        registrationToken: response.registrationToken,
      };
    }
  } catch (error) {
    console.error(error);
  }
}