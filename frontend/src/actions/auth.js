import axios from 'axios';
import { stopSubmit } from 'redux-form';
import history from '../history';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
} from './types';

// LOAD USER
export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    try {
        const res = await axios.get('/accounts/user/', tokenConfig(getState));
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });

    }
};



// LOGIN USER
export const login = (username, password, role = 'S') => async dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ username, password, role });
    try {
        dispatch({ type: USER_LOADING });
        const res = await axios.post('/accounts/login/', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        if (res.data.user.role === 'S') { history.push(`/profile/${res.data.id}`) }
        else { history.push(`/`) }
    } catch (err) {
        const errMsg = err.response.data;
        dispatch({
            type: LOGIN_FAIL,
            errMsg: errMsg
        });
    }
};

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {
    try {
        await axios.post('/accounts/logout/', null, tokenConfig(getState));
        dispatch({
            type: LOGOUT_SUCCESS
        });
        history.push('/login/');
    } catch (err) {
        const errMsg = err.response.data;
        dispatch({
            type: LOGOUT_FAILED,
            errMsg: errMsg
        });
    }
};

// helper function
export const tokenConfig = getState => {
    // Get token
    const token = getState().auth.token;
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};