import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualityReducer from './quality'
import professionReducer from './profession'
import userReducer from './users'
import commentReducer from './comments'

const rootReducer = combineReducers({ 
    qualities: qualityReducer,
    professions: professionReducer,
    users: userReducer,
    comments: commentReducer
})

export default function createStore() {
    return configureStore({ reducer: rootReducer })
}