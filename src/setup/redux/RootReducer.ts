import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'
import * as auth from '../../modules/auth'
import * as exam from "../../modules/exam-builder"

export const rootReducer = combineReducers({
  auth: auth.reducer,
  exam: exam.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
