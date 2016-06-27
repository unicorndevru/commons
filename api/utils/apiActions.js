import {API} from "commons/api/constants";
import {urlInterpolateStrict} from "commons/utils";


export const createApiAction = (config, TYPES) => {
  const {url, queryParams, routeParams, data, method = 'GET'} = config
  return {
    ...config,
    method,
    type: API,
    types: TYPES,
    url: urlInterpolateStrict(url, routeParams, queryParams),
    params: method === 'GET' ? {} : data
  }
}

export const createRequestAction = (apiAction) => {
  return {
    ...apiAction,
    type: apiAction.types['REQUEST']
  }
}

export const createSuccessAction = (apiAction, result) => {
  return {
    ...apiAction,
    result: {
      body: result.body,
      headers: result.headers,
      status: result.statusCode
    },
    type: apiAction.types['SUCCESS']
  }
}

export const createFailureAction = (apiAction, result) => {
  return {
    ...apiAction,
    error: {
      body: result.body,
      headers: result.headers,
      status: result.statusCode,
      statusString: result.status,
    },
    type: apiAction.types['FAILURE']
  }
}
