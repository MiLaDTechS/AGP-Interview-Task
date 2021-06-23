import { combineReducers } from "@reduxjs/toolkit";
import projectsReducer from './projects'
import categoriesReducer from './categories'

export default combineReducers({
    projects: projectsReducer,
    categories: categoriesReducer
});
