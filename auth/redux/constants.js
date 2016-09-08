import createActionRequestTypes from 'commons/utils/createActionRequestTypes'

export const LOGIN_USER = createActionRequestTypes('LOGIN_USER')
export const SIGNUP_USER = createActionRequestTypes('SIGNUP_USER')
export const GET_AUTH = createActionRequestTypes('GET_AUTH')
export const AUTH_RECOVERY_START = createActionRequestTypes('AUTH_RECOVERY_START')
export const AUTH_RECOVERY_CHECK = createActionRequestTypes('AUTH_RECOVERY_CHECK')
export const AUTH_RECOVER = createActionRequestTypes('AUTH_RECOVER')

export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SET_HEADER = 'AUTH_SET_HEADER'
