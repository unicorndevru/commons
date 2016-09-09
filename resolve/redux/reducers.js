import {
    RESOLVE_ROUTE_START,
    RESOLVE_ROUTE_END,
    RESOLVE_SAGA_END,
    RESOLVE_SAGA_START,
    RESOLVED_ON_SERVER,
    RESOLVE_KEEP,
    RESOLVE_SET_PREV_PATH
} from "./constants";
import {createReducer} from "commons/utils";
import {HISTORY_CHANGE} from "commons/containers/constants";
import queryString from "query-string";

export default createReducer({prevPath: []}, {
  [RESOLVED_ON_SERVER]: (state, action) => ({
    ...state,
    isClientFirstResolve: true
  }),

  [RESOLVE_ROUTE_START]: (state, action) => ({
    ...state,
    resolving: true
  }),

  [RESOLVE_ROUTE_END]: (state, action) => ({
    ...state,
    keepResolve: false,
    resolving: !!state.keepResolve,
    isClientFirstResolve: false
  }),

  [RESOLVE_SET_PREV_PATH]: (state, action) => ({
    ...state,
    prevPath: action.path
  }),

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

  [HISTORY_CHANGE]: (state, action) => action.state && ({
    ...state,
    query: action.state.location.query || (action.state.location.search && queryString.parse(action.state.location.search)) || {},
    params: action.state.params,
    pathname: action.state.location.pathname,
    resolving: true
  }) || ({
    ...state,
    resolving: true
  })
})
