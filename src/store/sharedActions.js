import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const loggedOut = createAction('loggedOut');

// Global Action Creators

export const logout = () => async (dispatch) => {
    localStorage.removeItem(`${process.env.REACT_APP_LS_PREFIX}user`);
    axios.defaults.headers.common['Authorization'] = '';

    return dispatch({
        type: loggedOut.type
    })
}

