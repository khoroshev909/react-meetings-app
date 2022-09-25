import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualityReducer from './quality'
import professionReducer from './profession'
import userReducer from './users'

const rootReducer = combineReducers({ 
    qualities: qualityReducer,
    professions: professionReducer,
    users: userReducer
})

export default function createStore() {
    return configureStore({ reducer: rootReducer })
}