import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'

const qualitySlice = createSlice({
    name: 'quality',
    initialState: {
        entities: null,
        loading: true,
        error: null,
        lastFetch: 0
    },
    reducers: {
        qualitiesRequested(state) {
            state.loading = true
        },
        qualitiesRecieved(state, action) {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.loading = false
        },
        qualitiesFailed(state, action) {
            state.error = action.payload
            state.loading = false
        }
    }
})

const { reducer: qualityReducer, actions } = qualitySlice

const { qualitiesRequested, qualitiesRecieved, qualitiesFailed } = actions

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) return true
    return false
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    dispatch(qualitiesRequested())
    const { lastFetch } = getState().qualities
    if (isOutdated(lastFetch)) {
        try {
            const { content } = await qualityService.fetchAll()
            dispatch(qualitiesRecieved(content))
        } catch (error) {
            dispatch(qualitiesFailed(error.message))
        }
    }
}

export const getQualitiesList = (ids) => (state) => {
    const qualitiesArray = []
    if (state.qualities.entities) {
        for (const id of ids) {
            for (const quality of state.qualities.entities) {
                if (quality._id === id) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }
    }
    return qualitiesArray
}

export const getQualities = () => (state) => state.qualities.entities

export const getQualitiesLoading = () => (state) => state.qualities.loading

export default qualityReducer