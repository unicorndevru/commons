import {
  LOGIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
  GET_AUTH,
  UPDATE_TOKEN
} from './constants';

import { createApiAction } from 'commons/api';

export const updateToken = (token) => {
  return {
    type: UPDATE_TOKEN,
    token
  };
};

export const getAuth = () => {
  return createApiAction({
    url: '/auth?_expand=user'
  }, GET_AUTH);
};

export const login = (email, password, redirect) => {
  return createApiAction({
    url: '/auth?_expand=user',
    method: 'POST',
    data: {
      email,
      password,
      provider: 'email'
    },
    redirect: redirect
  }, LOGIN_USER);
};

export const signup = ({lastName, firstName, birthday, email, password, redirect}) => {
  return createApiAction({
    url: '/auth?_expand=user',
    method: 'PUT',
    data: {
      firstName,
      lastName,
      email,
      birthday,
      password,
      provider: 'email'
    },
    redirect: redirect
  }, SIGNUP_USER);
};

export const logout = () => {
  return {
    type: LOGOUT_USER
  };
};
