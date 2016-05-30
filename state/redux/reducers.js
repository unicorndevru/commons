import {
    RESOLVE_ROUTE_START,
    RESOLVE_ROUTE_END,
    RESOLVE_SAGA_END,
    RESOLVE_SAGA_START,
    RESOLVED_ON_SERVER,
    RESOLVE_KEEP
} from "./constants";
import {createReducer} from "commons/utils";
import {HISTORY_CHANGE} from "commons/containers/constants";

export default createReducer({}, {
  [RESOLVED_ON_SERVER]: (state, action) => {
    return {
      ...state,
      isClientFirstResolve: true
    }
  },

  [RESOLVE_ROUTE_START]: (state, action) => {
    return {
      ...state,
      resolving: true
    }
  },

  [RESOLVE_ROUTE_END]: (state, action) => {
    return {
      ...state,
      keepResolve: false,
      resolving: !!state.keepResolve,
      isClientFirstResolve: false
    }
  },

  [RESOLVE_KEEP]: (state, action) => ({
    ...state,
    keepResolve: true
  }),

  [RESOLVE_SAGA_START]: (state, action) => ({
    ...state,
    currentSaga: action.name
  }),

  [RESOLVE_SAGA_END]: (state, action) => ({
    ...state,
    currentSaga: null
  }),

  [HISTORY_CHANGE]: (state, action) => {
    return {
      ...state,
      query: action.state.location.query,
      resolving: true
    }
  }
})
