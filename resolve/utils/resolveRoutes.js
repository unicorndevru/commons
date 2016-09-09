import { filter, map, propOr, F, is, addIndex, mergeAll } from 'ramda';
import { call, select, put } from 'redux-saga/effects';
import { STOP_RESOLVE } from 'commons/resolve/constants';
import { resolveSagaEnd, resolveSetPrevPath } from 'commons/resolve/redux/actions';
import { setPageProps } from 'commons/page';

const mapIndexed = addIndex(map)

let lastRoutes = []

export default function*(store, state) {

  const isReload = !state
  const actualRoutes = state && state.routes || lastRoutes

  if(!isReload) {
    lastRoutes = actualRoutes
  }

  const prevPath = yield select((s) => s.resolve.prevPath)

  const routeSagas = map(propOr(F, 'resolve'))(actualRoutes)

  const routeParams = yield select((s) => s.resolve.params)
  const routePath = map((p) => p.startsWith(":") ? routeParams[p.substring(1)] : p)(map(propOr('', 'path'))(actualRoutes))

  let pathChanged = false

  const actualSagas = isReload ? routeSagas : mapIndexed((s, i) => {
    if (pathChanged) {
      return s
    } else if (i === prevPath.length || prevPath[i] !== routePath[i]) {
      pathChanged = true
      return s
    } else {
      return F
    }
  })(routeSagas)

  while (0 < actualSagas.length) {
    const saga = actualSagas.shift()

    let result = null;

    try {
      result = yield call(saga)
      yield put(resolveSagaEnd())
      if (result === STOP_RESOLVE) {
        //console.log("STOP RESOLVE")
        actualSagas.splice(0, routeSagas.length)
      }
      //console.log("should be defined:", result)
    } catch (e) {
      console.error("Resolve error: ", e, e.stack);
    }

    if (is(Array, result)) {
      while (0 < result.length) {
        try {
          yield result.shift();
        } catch (e) {
          console.error("Array resolve error: ", e)
        }
      }
    }
  }

  const routePageProps = filter((p) => !!p, map(propOr(null, 'pageProps'))(actualRoutes))
  const pagePropsArray = []
  while (0 < routePageProps.length) {
    try {
      pagePropsArray.push(yield call(routePageProps.shift()))
    } catch (e) {
      console.error("Page props resolve error: ", e, e.stack);
      break
    }
  }

  const pageProps = mergeAll(pagePropsArray)

  yield put(setPageProps(pageProps))

  yield put(resolveSetPrevPath(routePath))
}
