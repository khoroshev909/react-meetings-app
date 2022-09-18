import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'

const professionSlice = createSlice({
    name: 'profession',
    initialState: {
        entities: null,
        loading: true,
        error: null,
        lastFetch: 0
    },
    reducers: {
        professionsRequested(state) {
            state.loading = true
        },
        professionsRecieved(state, action) {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.loading = false
        },
        professionsFailed(state, action) {
            state.error = action.payload
            state.loading = false
        }       
    }
})

const { actions, reducer: professionReducer } = professionSlice

const { professionsRequested, professionsRecieved, professionsFailed } = actions

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) return true
    return false
}

export const loadProfessions = () => async (dispatch, getState) => {
    dispatch(professionsRequested())
    const { lastFetch } = getState().qualities
    if (isOutdated(lastFetch)) {
        try {
            const { content } = await professionService.fetchAll()
            dispatch(professionsRecieved(content))
        } catch (error) {
            dispatch(professionsFailed(error.message))
        }
    }
}

export const getProfessions = () => (state) => state.professions.entities

export const getProfessionsLoading = () => (state) => state.professions.loading

export const getProfessionById = (profId) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((p) => p._id === profId)
    }
}

export default professionReducer
