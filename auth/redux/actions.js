import {
  LOGIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
  GET_AUTH,
  UPDATE_TOKEN,
  AUTH_RECOVERY_START,
  AUTH_RECOVERY_CHECK,
  AUTH_RECOVER,
SET_HEADER
} from "./constants";
import {createApiAction} from "commons/api";

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

export const login = (email, password) => {
  return createApiAction({
    url: '/auth?_expand=user',
    method: 'POST',
    data: {
      email,
      password,
      provider: 'email'
    }
  }, LOGIN_USER);
};

export const loginByToken = (provider, token) =>
  createApiAction({
    url: '/auth?_expand=user',
    method: 'POST',
    data: {
      token,
      provider
    }
  }, LOGIN_USER)

export const signup = (fields) => {
  return createApiAction({
    url: '/auth?_expand=user',
    method: 'PUT',
    data: {
      ...fields,
      provider: 'email'
    }
  }, SIGNUP_USER);
};

export const logout = () => {
  return {
    type: LOGOUT_USER
  };
};

export const authStartPasswordRecovery = (email) =>
  createApiAction({
    url: '/auth/actions/startPasswordRecovery',
    method: 'POST',
    data: {email}
  }, AUTH_RECOVERY_START)


export const authCheckPasswordRecovery = (token) =>
  createApiAction({
    url: '/auth/actions/checkPasswordRecovery',
    method: 'POST',
    data: {token}
  }, AUTH_RECOVERY_CHECK)


export const authRecoverPassword = (token, newPass) =>
  createApiAction({
    url: '/auth/actions/recoverPassword',
    method: 'POST',
    data: {token, newPass}
  }, AUTH_RECOVER)

export const setHeader = (name, value) => ({
  type: SET_HEADER,
  name,
  value
})
