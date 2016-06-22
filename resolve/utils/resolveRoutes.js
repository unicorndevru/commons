import { filter, map, propOr, zip, is, identity, F, zipWith, equals, concat, drop, addIndex, mergeAll } from 'ramda'
import { call, fork, select, put } from 'redux-saga/effects'
import {STOP_RESOLVE} from 'commons/resolve/constants'
import {resolveSagaStart, resolveSagaEnd, resolveSetPrevPath} from 'commons/resolve/redux/actions'
import {setPageProps} from 'commons/page'

const mapIndexed = addIndex(map)

export default function* (store, state){
  const { routes } = state

  const prevPath = yield select((s) => s.resolve.prevPath)

  const routeSagas = map(propOr(F, 'resolve'))(routes)

  const routeParams = yield select((s) => s.resolve.params)
  const routePath = map((p) => p.startsWith(":") ? routeParams[p.substring(1)] : p)(map(propOr("", 'path'))(routes))

  let pathChanged = false

  const actualSagas = mapIndexed((s, i) => {
    if(pathChanged) {
      return s
    } else if(i === prevPath.length || prevPath[i] !== routePath[i]) {
      pathChanged = true
      return s
    } else {
      return F
    }
  })(routeSagas)

  while(0 < actualSagas.length){
    const saga = actualSagas.shift()

    let result = null;

    try {
      result = yield call(saga)
      yield put(resolveSagaEnd())
      if(result === STOP_RESOLVE) {
        //console.log("STOP RESOLVE")
        actualSagas.splice(0,routeSagas.length)
      }
      //console.log("should be defined:", result)
    } catch (e) {
      console.error("Resolve error: ", e, e.stack);
    }

    if(is(Array, result)){
      while(0 < result.length){
        try {
          yield result.shift();
        } catch(e){
          console.error("Array resolve error: ", e)
        }
      }
    }
  }

  const routePageProps = filter((p) => !!p, map(propOr(null, 'pageProps'))(routes))
  const pagePropsArray = []
  while(0 < routePageProps.length) {
    try {
      pagePropsArray.push(yield call(routePageProps.shift()))
    } catch(e) {
      console.error("Page props resolve error: ", e, e.stack);
      break
    }
  }

  const pageProps = mergeAll(pagePropsArray)

  yield put(setPageProps(pageProps))

  yield put(resolveSetPrevPath(routePath))
}
