import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Dimmer, Loader } from 'semantic-ui-react'

class UserLoginForm extends Component {
    state = {
        username: "",
        password: "",
    };

    static propType = {
        login: PropTypes.func.isRequired,
        auth: PropTypes.object,
        errMsg: PropTypes.object,

    }


    onSubmit = e => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password)
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    render() {
        const { username, password } = this.state;
        const { isAuthenticated, isLoading } = this.props.auth;
        if (isAuthenticated) {
            return <Redirect to='/home/' />;
        }
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Icon disabled name='user' />{this.state.activLoginTitle} Log-in
                        </Header>
                    <Form size='large' onSubmit={this.onSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                name='username'
                                onChange={this.onChange}
                                value={username}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={this.onChange}
                                value={password}
                            />
                            {this.props.errMsg &&
                                <Message negative color='red' size='mini'>
                                    <p>{this.props.errMsg.non_field_errors.join()}</p>
                                </Message>
                            }
                            <Button color='purple' fluid size='small' disabled={isLoading}>
                                {isLoading ? (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                ) : 'Login'}
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to='/home/register'>Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errMsg: state.auth.error,
});

export default connect(
    mapStateToProps,
    { login }
)(UserLoginForm);
