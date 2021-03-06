import { HISTORY_CHANGE } from 'commons/containers/constants';
import { HISTORY_CHANGE_RESOLVED } from '../constants';
import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { resolveStart, resolveEnd } from '../redux/actions';
import resolveRoutes from '../utils/resolveRoutes';
import { RESOLVE_RELOAD } from '../redux/constants';


export default function* resolve() {
  yield* takeLatest([HISTORY_CHANGE, RESOLVE_RELOAD], function* resolveSage({ store, state }) {
    if (!(yield select(s => s.resolve.isClientFirstResolve))) {
      yield put(resolveStart())
      yield resolveRoutes(store, state)
    }
    yield put(resolveEnd())
    yield put({
      type: HISTORY_CHANGE_RESOLVED
    })
  })
}
