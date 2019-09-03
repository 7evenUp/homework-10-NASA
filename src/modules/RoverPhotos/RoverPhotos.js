import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
    changeSol,
    fetchPhotosRequest,
    fetchPhotosSuccess,
    fetchPhotosFailure
} from './actions'

const sol = handleActions(
    {
        [changeSol]: (state, action) => ({
            ...state,
            current: action.payload
        })
    },
    {
        current: 1,
        min: 1,
        max: 100
    }
)

const photos = handleActions(
    {
        [fetchPhotosRequest]: (state, action) => ({
            ...state,
            [action.payload.name]: {
                ...state[action.payload.name],
                [action.payload.sol]: {
                    isLoading: true,
                    photos: [],
                    isLoaded: false
                }
            }
        }),
        [fetchPhotosSuccess]: (state, action) => ({
            ...state,
            [action.payload.name]: {
                ...state[action.payload.name],
                [action.payload.sol]: {
                    isLoading: false,
                    photos: action.payload.photos,
                    isLoaded: true
                }
            }
        }),
        [fetchPhotosFailure]: (state, action) => ({
            ...state,
            [action.payload.name]: {
                ...state[action.payload.name],
                [action.payload.sol]: {
                    isLoading: true,
                    photos: [],
                    isLoaded: false,
                    error: action.payload.error
                }
            }
        })
    },
    {
        curiosity: {},
        opportunity: {},
        spirit: {}
    }
)

export default combineReducers({
    sol,
    photos
})

export const getSol = state => state.roverPhotos.sol
export const getPhotos = state => state.roverPhotos.photos