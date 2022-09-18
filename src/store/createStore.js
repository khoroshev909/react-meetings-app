import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualityReducer from './quality'
import professionReducer from './profession'

const rootReducer = combineReducers({ 
    qualities: qualityReducer,
    professions: professionReducer
})

export default function createStore() {
    return configureStore({ reducer: rootReducer })
}