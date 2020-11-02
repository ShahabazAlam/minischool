import { combineReducers } from 'redux';
import users from './crudReucers';
import auth from './auth'; // added

export default combineReducers({
    users,
    auth,
});