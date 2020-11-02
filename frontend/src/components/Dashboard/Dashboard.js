import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Grid, Header, Icon, Image,
    Menu, Divider, Form, Input,
    Segment, Button, Radio, Table,
    Dimmer, Message, Loader
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { register, fetchUsersData, deleteUser } from '../../actions/crudActions';
import { confirmAlert } from 'react-confirm-alert';



class UserTable extends Component {
    state = {
        users: [],
        loading: false,
        deleting_button_id: null,
        error: null,
        success: false,

    };


    static propTypes = {
        users: PropTypes.object,
        role: PropTypes.string
    }

    ConfirmPopup = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.setState({ deleting_button_id: id });
                        this.props.deleteUser(id)
                    }
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    render() {
        const { data, isloading, isDeleting, success, error } = this.props.users;
        const { deleting_button_id } = this.state;
        return (
            <Fragment>
                {success &&
                    <Message positive>
                        <Message.Header>Success</Message.Header>
                        <p>
                            Deleted Successefully
                        </p>
                    </Message>}
                {error &&
                    <Message negative>
                        <Message.Header>{error}</Message.Header>
                        <p>
                            {error}
                        </p>
                    </Message>}
                { isloading &&
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                }
                <Header style={{ textAlign: 'center' }}>{this.props.activeItem}</Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Full Name</Table.HeaderCell>
                            {data.length > 0 && data[0].user.role == 'S' ?
                                <Fragment>
                                    <Table.HeaderCell>Enroll</Table.HeaderCell>
                                    <Table.HeaderCell>Father Name</Table.HeaderCell>
                                </Fragment>
                                : <Table.HeaderCell>Email</Table.HeaderCell>
                            }
                            <Table.HeaderCell>Photo</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.length > 0 ?
                            data.map((u, k) => {
                                return (
                                    <Table.Row key={k}>
                                        <Table.Cell>{k + 1}</Table.Cell>
                                        <Table.Cell><Icon name={u.user.role == 'S' ? 'student' : 'user secret'} />{u.user.name ? u.name : u.user.username}</Table.Cell>
                                        {u.user.role == 'S' &&
                                            <>
                                                {u.ID !== null ? <Table.Cell>{u.ID}</Table.Cell> : <Table.Cell>None</Table.Cell>}
                                                {u.fname !== null ? <Table.Cell>{u.fname}</Table.Cell> : <Table.Cell>None</Table.Cell>}
                                            </>
                                        }
                                        {u.user.role == 'T' &&
                                            <>
                                                {u.user.email !== null ? <Table.Cell>{u.user.email}</Table.Cell> : <Table.Cell>None</Table.Cell>}
                                            </>
                                        }
                                        {u.photo !== null ? <Table.Cell><img src={u.photo} height='50px' width='50px' /></Table.Cell> : <Table.Cell>None</Table.Cell>}
                                        <Table.Cell>
                                            <Link to={`profile/${u.user.id}`}>
                                                <Icon
                                                    name="eye"
                                                    color="orange"
                                                    style={{ cursor: 'pointer' }} />
                                            </Link>
                                            {this.props.role == 'A' &&
                                                <>
                                                    <Link to={`detail/${u.user.id}`}>
                                                        <Icon
                                                            name="edit"
                                                            color="green"
                                                            style={{ cursor: 'pointer' }} />
                                                    </Link>
                                                    {isDeleting && this.state.deleting_button_id === u.user.id ?
                                                        <i
                                                            className="fa fa-refresh fa-spin"
                                                            style={{ marginRight: "5px" }}
                                                        /> : <Icon
                                                            name="trash"
                                                            color="red"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => this.ConfirmPopup(u.user.id)} />}
                                                </>
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }) :
                            <Table.Row>
                                <Table.Cell></Table.Cell>
                                <Table.Cell style={{ textAlign: 'center' }}>
                                    No Data Available
                            </Table.Cell>
                            </Table.Row>}
                    </Table.Body>
                </Table>
            </Fragment >
        );
    }
}
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }
    }

    static propType = {
        signup: PropTypes.func.isRequired,
        error: PropTypes.object,
    }


    onSubmit = e => {
        e.preventDefault();
        if (this.state.password.length <= 6) {
            this.setState({ error: 'Password than 6 character' })
        } else {
            this.props.register(this.state.username,
                this.state.password, this.props.activeItem).then(
                    res => {
                        this.setState({
                            username: '',
                            email: '',
                            password: '',
                            error: null
                        })
                    }
                )
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    render() {
        const { username, password } = this.state;
        const { activeItem } = this.props;
        const { error, isLoading, isUpdating } = this.props;

        return (
            <>
                {isLoading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                )}
                <Grid textAlign='center' style={{ height: '30vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Icon disabled name='user' />{activeItem}
                        </Header>
                        <Form size='large' onSubmit={this.onSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    placeholder='Username'
                                    type='text'
                                    name="username"
                                    onChange={this.onChange}
                                    value={username}
                                    required
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    placeholder='Password'
                                    type='password'
                                    name="password"
                                    onChange={this.onChange}
                                    value={password}
                                    required
                                />
                                {this.state.error &&
                                    <Message negative color='red' size='mini'>
                                        <p>{this.state.error}</p>
                                    </Message>
                                }
                                {error &&
                                    <Message negative color='red' size='mini'>
                                        <p>{error.username[0]}</p>
                                    </Message>
                                }
                                <Button color='teal' fluid size='large'>
                                    {isUpdating ? (
                                        <i
                                            className="fa fa-refresh fa-spin"
                                            style={{ marginRight: "5px" }}
                                        />
                                    ) : 'Next'}
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </>
        )
    }
}



class Dashboard extends Component {
    state = { activeItem: 'All Students', }

    componentDidMount() {
        this.props.fetchUsersData(this.state.activeItem === 'All Students' ? 'S' : 'T')
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        deleteUser: PropTypes.func,
        register: PropTypes.func,
        users: PropTypes.object
    }


    handleItemClick = (e, { name }) => this.setState({ activeItem: name },
        () => this.props.fetchUsersData(this.state.activeItem === 'All Students' ? 'S' : 'T'))

    render() {
        const { activeItem } = this.state;
        const { user } = this.props.auth;
        const { error, isloading, isUpdating, isDeleting } = this.props.users;
        return (
            <Fragment>
                <Header as='h2'>
                    <center>
                        <Icon name='dashboard' size='large' />
                        <Header.Content>
                            Dashboard
                        <Header.Subheader>Manage your preferences</Header.Subheader>
                        </Header.Content>
                    </center>
                </Header>
                <Divider />
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Menu inverted pointing vertical>
                                <Menu.Item
                                    name='All Students'
                                    active={activeItem === 'All Students'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item
                                    name='All Teachers'
                                    active={activeItem === 'All Teachers'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item
                                    name='Add New Student'
                                    active={activeItem === 'Add New Student'}
                                    onClick={this.handleItemClick}
                                />
                                {user.role == 'A' &&
                                    <Menu.Item
                                        name='Add New Teacher'
                                        active={activeItem === 'friends'}
                                        onClick={this.handleItemClick}
                                    />}
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            {this.state.activeItem === 'All Students' ?
                                <UserTable
                                    users={this.props.users}
                                    role={user.role}
                                    activeItem={this.state.activeItem}
                                    deleteUser={this.props.deleteUser} /> :
                                this.state.activeItem === 'All Teachers' ?
                                    <UserTable
                                        users={this.props.users}
                                        role={user.role}
                                        activeItem={this.state.activeItem}
                                        deleteUser={this.props.deleteUser} />
                                    :
                                    <Register
                                        activeItem={this.state.activeItem}
                                        register={this.props.register}
                                        error={error}
                                        isLoading={isloading}
                                        isUpdating={isUpdating}
                                    />
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    users: state.users
})
export default connect(mapStateToProps, { register, fetchUsersData, deleteUser })(Dashboard);
