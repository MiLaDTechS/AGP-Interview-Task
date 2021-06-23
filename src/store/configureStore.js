import { configureStore } from '@reduxjs/toolkit'
import api from './middleware/api';
import apiToast from './middleware/apiToasts';
import reducer from './reducer'

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([api, apiToast]),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;