import { fork, takeEvery, select, call, put } from 'redux-saga/effects'
import { fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure } from './actions'
import { getPhotos } from './api'
import { getApiKey } from '../Auth'

function* watchFetchPhotos() {
    yield takeEvery(fetchPhotosRequest, fetchPhotosAsync)
}

function* fetchPhotosAsync({ payload: { name, sol } }) {
    try {
        const apiKey = yield select(getApiKey)
        const photos = yield call(getPhotos, apiKey, name, sol)
        const result = { ...photos, name, sol }
        yield put(fetchPhotosSuccess(result))
    } catch (error) {
        yield put(fetchPhotosFailure(error))
    }
}

export default function*(){
    yield fork(watchFetchPhotos)
}