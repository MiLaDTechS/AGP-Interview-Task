import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const loggedOut = createAction('loggedOut');

// Global Action Creators

export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = '';

    return dispatch({
        type: loggedOut.type
    })
}

