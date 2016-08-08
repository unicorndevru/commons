import { LOGIN_USER, LOGOUT_USER, SIGNUP_USER, GET_AUTH, UPDATE_TOKEN } from './constants';
import { RESOLVED_ON_SERVER } from 'commons/resolve/redux/constants';
import { createReducer } from 'commons/utils';

export default createReducer({}, {
  [RESOLVED_ON_SERVER]: (state, action) => ({
    ...state,
    headers: null
  }),

  [UPDATE_TOKEN]: (state, action) => ({
    ...state,
    token: action.token
  }),

  [GET_AUTH.SUCCESS]: (state, action) => ({
    ...state,
    ...action.result.body
  }),

  [SIGNUP_USER.SUCCESS]: (state, action) => ({
    ...state,
    ...action.result.body
  }),

  [LOGIN_USER.SUCCESS]: (state, action) => ({
    ...state,
    ...action.result.body
  }),

  [LOGOUT_USER]: (state, action) => ({})
})
