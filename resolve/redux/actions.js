import {
    RESOLVE_ROUTE_END,
    RESOLVE_ROUTE_START,
    RESOLVE_SAGA_END,
    RESOLVE_SAGA_START,
    RESOLVED_ON_SERVER,
    RESOLVE_KEEP,
    RESOLVE_SET_PREV_PATH
} from "./constants";

export const resolvedOnServer = () => ({
  type: RESOLVED_ON_SERVER
})

export const resolveStart = () => ({
  type: RESOLVE_ROUTE_START
})

export const resolveEnd = () => ({
  type: RESOLVE_ROUTE_END
})

export const resolveSetPrevPath = (path) => ({
  type: RESOLVE_SET_PREV_PATH,
  path
})

export const resolveSagaStart = (name) => ({
  type: RESOLVE_SAGA_START,
  name
})

export const resolveSagaEnd = (name) => ({
  type: RESOLVE_SAGA_END,
  name
})

export const resolveKeep = () => ({
  type: RESOLVE_KEEP
})