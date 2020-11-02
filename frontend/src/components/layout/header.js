import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth'
import {
    Container,
    Icon,
    Image,
    Menu,
    Dropdown,
    Segment,
    Divider
}
    from 'semantic-ui-react';


class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const AuthorizedUserLinks = (
            <Menu.Menu position='right'>
                {user && user.role !== 'S' && <Menu.Item as={Link} to='/home/'><strong>Dashboard</strong></Menu.Item>}
                <Dropdown item text={user && user.username} icon='user'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.props.logout} >LogOut</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>

        )
        const UnauthorizedUserLinks = (
            <Menu.Item as={Link} to='/home/login'
                variant="outline-primary"
                position='right'
                name='LogIn' />
        )
        return (
            <Segment inverted style={{ textAlign: 'center', position: 'fixed', width: '100%', background: 'black', top: 0, zIndex: 20 }}>
                <Menu size='large' inverted pointing secondary >
                    <Menu.Item as={Link} to='/home/'><strong>My-School</strong></Menu.Item>

                    {isAuthenticated ? AuthorizedUserLinks : UnauthorizedUserLinks}
                </Menu>
            </Segment>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Header);