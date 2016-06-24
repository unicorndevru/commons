import {
  SET_PAGE_PROPS
} from './constants'

export const setPageProps = ({title,meta=[], link=[]}) => {
  return {
    type: SET_PAGE_PROPS,
    title,
    meta,
    link
  }
}
