import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './apiActions';
import { loggedOut } from './sharedActions';

const slice = createSlice({
    name: "authUser",
    initialState: {
        user: {},
        scores: {}
    },
    reducers: {
        loggedIn: (state, action) => {
            state.user = action.payload;
        },
        scoresReceived: (state, action) => {
            state.scores = action.payload;
        }
    },
    extraReducers: {
        [loggedOut]: (state, action) => {
            return {
                user: {},
                scores: {}
            }
        },
    }
})

const { loggedIn, scoresReceived } = slice.actions;
export default slice.reducer

// Action Creators

export const login = (data) => (dispatch) => dispatch(
    apiCallBegan({
        url: '/accounts/login/',
        method: 'POST',
        data,
        onSuccess: loggedIn.type
    })
)

export const validatePhone = (data) => (dispatch) => dispatch(
    apiCallBegan({
        url: '/accounts/validate_phone',
        method: 'POST',
        data
    })
)

export const validateOTP = (data) => (dispatch) => dispatch(
    apiCallBegan({
        url: '/accounts/validate_otp/',
        method: 'POST',
        data
    })
)

export const register = (data) => (dispatch) => dispatch(
    apiCallBegan({
        url: '/accounts/register/',
        method: 'POST',
        data
    })
)

export const getScores = (slug) => (dispatch) => dispatch(
    apiCallBegan({
        url: `/accounts/scores/${slug}`,
        onSuccess: scoresReceived.type
    })
)