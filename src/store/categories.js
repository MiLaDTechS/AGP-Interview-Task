import { createSlice } from '@reduxjs/toolkit'
import { loggedOut } from './sharedActions';
import moment from 'moment-jalaali'
import { apiCallBegan } from './apiActions';

const slice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        loading: 'idle',
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        },
        categoriesReceived: (state, action) => {
            state.list = action.payload;
            if (state.loading === 'pending') {
                state.loading = 'idle';
            }
            state.lastFetch = Date.now();
        },
        categoriesRequestFailed: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
            }
        }
    },
    extraReducers: {
        [loggedOut]: (state, action) => {
            return {
                list: [],
                loading: 'idle',
                lastFetch: null
            }
        },
    }
})

const { categoriesRequested, categoriesReceived, categoriesRequestFailed } = slice.actions;
export default slice.reducer

// Action Creators
export const getCategories = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.categories;

    const diffInSeconds = moment().diff(moment(lastFetch), "seconds");
    if (diffInSeconds < 10) return;

    return dispatch(
        apiCallBegan({
            url: '/squadBlog/all_categories',
            onStart: categoriesRequested.type,
            onSuccess: categoriesReceived.type,
            onError: categoriesRequestFailed.type
        })
    );
}

// Selectors