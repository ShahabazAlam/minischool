import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // added
import store from '../store'; // added
import Header from './layout/header'; // added
import { Router, Route, Switch } from 'react-router-dom'; // added
import history from '../history'; // added
import AdminLoginForm from './auth/LoginForm'; // added
import PrivateRoute from './common/PrivateRoot'; // added
import { loadUser } from '../actions/auth'; // added
import Dashboard from './Dashboard/Dashboard';
import AddUserDetail from './Dashboard/AddDetail';
import Profile from './Student/Profile';
import UserLogInForm from './auth/UserLogInForm';
import NotFoundPage from './common/pageNotFound';
import UserRegisterationForm from './auth/UserRegistration'

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                    <div style={{ marginBottom: '60px', marginTop: '100px' }}>
                        <Switch>
                            <PrivateRoute exact path='/home/' component={Dashboard} />
                            <PrivateRoute exact path='/' component={Dashboard} />
                            <Route path='/home/login/' component={UserLogInForm} />
                            <Route exact path='/home/admin' component={AdminLoginForm} />
                            <Route exact path='/home/detail/:id' component={AddUserDetail} />
                            <Route exact path='/home/profile/:id' component={Profile} />
                            <Route exact path='/home/register' component={UserRegisterationForm} />
                            <Route path="" component={NotFoundPage} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
ReactDOM.render(<App />, document.querySelector('#app'));