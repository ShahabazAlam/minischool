import axios from 'axios';
import { reset } from 'redux-form'; // added
import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAILED,
    DELETING_USER,
    DELETING_SUCCESS,
    DELETING_FAILED,
    ADD_USER_DETAIL,
    ADD_USER_DETAIL_SUCCESS,
    ADD_USER_DETAIL_FAILED
} from './types'; // added ADD_TODO
import history from '../history';
import { tokenConfig } from './auth'

// ADD USER DETAIL
export const AddDetail = (formData) => async (dispatch, getState) => {
    dispatch({
        type: ADD_USER_DETAIL
    })
    try {
        const res = await axios.post('/api/add-detail/', formData, tokenConfig(getState));
        dispatch({
            type: ADD_USER_DETAIL_SUCCESS,
        });
        history.push(`/`)
    } catch (err) {
        const errmsg = err.response.data;
        dispatch({
            type: ADD_USER_DETAIL_FAILED,
            errMsg: errmsg,
        });
    }
};


// REGISTER TEACHER OR STUDENT

export const register = (username, password, activeItem) => async dispatch => {
    let role = ''
    if (activeItem === 'Add New Teacher') role = 'T'; else role = 'S'

    //Header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        username, role,
        password
    });
    try {
        dispatch({ type: ADD_USER });
        const res = await axios.post('/accounts/register/', body, config);
        dispatch({
            type: ADD_USER_SUCCESS
        });
        history.push(`/detail/${res.data.user.id}`)
    } catch (err) {
        const errmsg = err.response.data;
        dispatch({
            type: ADD_USER_FAILED,
            errMsg: errmsg,
        });
    }
}



// FETCH USERS
export const fetchUsersData = (activeItem) => async (dispatch, getState) => {
    dispatch({
        type: GET_USERS
    });
    try {
        const res = await axios.get(`/api/fetch-users/${activeItem}`, tokenConfig(getState));
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errmsg = err.response.data;
        dispatch({
            type: GET_USERS_FAILED,
            errMsg: errmsg,
        });
    }
}


// FETCH USER
export const fetchUser = (id) => async (dispatch, getState) => {
    dispatch({
        type: GET_USER
    });
    try {
        const res = await axios.get(`/api/fetch-user/${id}/`, tokenConfig(getState));
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data,
        });
    } catch {
        const errmsg = err.response.data;
        dispatch({
            type: GET_USER_FAILED,
            errMsg: errmsg,
        });
    }
};



// DELETE USER
export const deleteUser = (id) => async (dispatch, getState) => {
    dispatch({
        type: DELETING_USER
    });
    try {
        const res = await axios.delete(`/api/delete-user/${id}/`, tokenConfig(getState));
        dispatch({
            type: DELETING_SUCCESS,
            payload: id
        });
    } catch {
        const errmsg = err.response.data;
        dispatch({
            type: DELETING_FAILED,
            errMsg: errmsg,
        });
    }
}
