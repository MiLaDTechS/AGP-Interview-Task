import { combineReducers } from '@reduxjs/toolkit'
import entities from './entities'
import authUserReducer from './authUser'

export default combineReducers({
    authUser: authUserReducer,
    entities: entities
})