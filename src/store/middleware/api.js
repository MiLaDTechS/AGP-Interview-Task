import axios from "axios";
import * as actions from "../apiActions";

const api = ({ dispatch }) => next => action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    onStart && dispatch({ type: onStart });

    next(action);

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                baseURL: process.env.REACT_APP_API_URL,
                url,
                method,
                data
            });

            if (response.data.status === 401 || response.data.status === 403 || response.data.status === 404) {
                throw Error(response.data.detail);
            }

            if (onSuccess === 'authUser/loggedIn' && response.data.token) {
                localStorage.setItem(`${process.env.REACT_APP_LS_PREFIX}user`, JSON.stringify(response.data));
                axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
            }

            // General
            dispatch(actions.apiCallSuccess(response.data));
            // Specific
            onSuccess && dispatch({ type: onSuccess, payload: response.data });
            resolve(response.data);

        } catch (error) {
            // General
            dispatch(actions.apiCallFailed({ message: error.response ? (Array.isArray(error.response.data.detail) ? error.response.data.detail[0] : error.response.data.detail) : error.message }));
            // Specific
            onError && dispatch({ type: onError, payload: error.message });
            reject(error);
        }
    });
};

export default api;
