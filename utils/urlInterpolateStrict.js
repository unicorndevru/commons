import {isEmpty} from 'ramda'
import queryString from 'query-string'

export default (urlTemplate, params = {}, query = {}) => {

  const interpolatedUrl = urlTemplate.replace(/:([\w\d-]+)/g, (substr, match) => params[match] || '')

  if(!isEmpty(query)){
    return interpolatedUrl + "?" + queryString.stringify(query)
  } else {
    return interpolatedUrl
  }
}
