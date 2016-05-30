import { filter, map, propOr, compose, is, identity, F, zipWith, equals, concat, drop } from 'ramda'
import { call, fork, select, put } from 'redux-saga/effects'
import {STOP_RESOLVE} from 'commons/state/constants'
import {resolveSagaStart, resolveSagaEnd} from 'commons/state/redux/actions'

let previousSagas = []

export default function* (store, state){
  const { routes } = state

  const routeSagas = compose(
    filter(identity),
    map(propOr(F, 'resolve'))
  )(routes)

  const headSagas = zipWith((a,b) => equals(a, b) ? F : b, previousSagas, routeSagas )
  const actualSagas = concat(headSagas, drop(headSagas.length, routeSagas))
  previousSagas = routeSagas
  
  
  while(0 < actualSagas.length){
    const saga = actualSagas.shift()

    const sagaName = saga.name
    
    let result = null;

    try {
      if(sagaName) yield put(resolveSagaStart(sagaName))
      result = yield call(saga)
      if(sagaName) yield put(resolveSagaEnd(sagaName))
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
}
