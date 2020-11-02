import _ from 'lodash';
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
} from '../actions/types'; // added ADD_TODO

const initialState = {
    isloading: false,
    success: false,
    isDeleting: false,
    isUpdating: false,
    error: null,
    data: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
        case GET_USERS:
            return {
                ...state,
                isloading: true,
            };
        case ADD_USER:
        case ADD_USER_DETAIL:
            return {
                ...state,
                isUpdating: true,
            };
        case GET_USERS_SUCCESS:
        case GET_USER_SUCCESS:
            return {
                data: action.payload,
                isloading: false,
            };
        case ADD_USER_DETAIL_SUCCESS:
        case ADD_USER_SUCCESS:
        case GET_USERS_FAILED:
        case GET_USER_FAILED:
        case DELETING_FAILED:
        case ADD_USER_FAILED:
        case ADD_USER_DETAIL_FAILED:
            return {
                ...state,
                isloading: false,
                success: false,
                isDeleting: false,
                isUpdating: false,
                error: action.errMsg,
            };
        case DELETING_USER:
            return {
                ...state,
                isDeleting: true,
            };
        case DELETING_SUCCESS:
            return {
                data: [...state.data.filter(u => (u.user.id !== action.payload))],
                isDeleting: false,
            };
        default:
            return state;
    }
};
