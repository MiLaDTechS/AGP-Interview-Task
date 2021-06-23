import axios from 'axios';
import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useLocalStorage } from '../utils';

const PrivateRoute = ({ component, ...rest }) => {
    const { value: user } = useLocalStorage('user');
    axios.defaults.headers.common['Authorization'] = user?.token && `Token ${user?.token}`;

    return (
        <Route {...rest} render={(props) => user?.token ? (component) : (<Redirect to="/login" />)} />
    )
}

export default PrivateRoute;
