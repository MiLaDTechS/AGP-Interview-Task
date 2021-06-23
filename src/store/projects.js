import { createSlice } from '@reduxjs/toolkit'
import { loggedOut } from './sharedActions';
import moment from 'moment-jalaali'
import { apiCallBegan } from './apiActions';

const slice = createSlice({
    name: "projects",
    initialState: {
        pagination: {
            count: 0,
            next: null,
            previous: null
        },
        list: [],
        loading: 'pending',
        lastFetch: null
    },
    reducers: {
        projectsRequested: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        },
        projectsReceived: (state, action) => {
            const { results, ...pagination } = action.payload;
            state.list = action.payload.results;
            state.pagination = pagination;

            if (state.loading === 'pending') {
                state.loading = 'idle';
            }
            state.lastFetch = Date.now();
        },
        projectsRequestFailed: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
            }
        }
    },
    extraReducers: {
        [loggedOut]: (state, action) => {
            return {
                pagination: {
                    count: 0,
                    next: null,
                    previous: null,
                },
                list: [],
                loading: 'idle',
                lastFetch: null
            }
        },
    }
})

const { projectsRequested, projectsReceived, projectsRequestFailed } = slice.actions;
export default slice.reducer

// Action Creators
export const getProjects = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.projects;

    const diffInSeconds = moment().diff(moment(lastFetch), "seconds");
    if (diffInSeconds < 10) return;

    return dispatch(
        apiCallBegan({
            url: '/squadBlog/projects_detail',
            onStart: projectsRequested.type,
            onSuccess: projectsReceived.type,
            onError: projectsRequestFailed.type
        })
    );
}

// Selectors