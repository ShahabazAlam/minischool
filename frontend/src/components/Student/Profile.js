import React, { Component, Fragment } from 'react';
import {
    Container,
    Divider,
    Grid,
    Image,
    Menu,
    Segment

} from "semantic-ui-react";
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/crudActions';
import PropTypes from 'prop-types';

class Profile extends Component {
    state = {
        activeItem: 'Basic Info'
    }


    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id)
    }


    static propTypes = {
        auth: PropTypes.object.isRequired,
        user: PropTypes.object
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {
        const { data } = this.props.user;
        const { activeItem } = this.state
        return (
            <Fragment>
                <Grid celled='internally'>
                    {data.name, data.address, data.dob, data.ID, data.fname,
                        data.standard, data.gender, data.photo !== null ?
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Image src={data.photo} height='200px' width='250px' circular />
                                </Grid.Column>
                                <Divider />
                                <Grid.Column width={12}>
                                    <Segment>
                                        <h1>{data.name}</h1>
                                        <h4>{data.user && data.user.role === 'S' ? 'Student' : 'Teacher'}</h4>
                                    </Segment>
                                    <Grid.Column width={12}>
                                        <div>
                                            <Menu attached='top' tabular>
                                                <Menu.Item
                                                    name='Basic Info'
                                                    active={activeItem === 'Basic Info'}
                                                    onClick={this.handleItemClick}
                                                />
                                            </Menu>

                                            <Segment attached='bottom'>
                                                <Grid divided='vertically'>
                                                    <Grid.Row columns={2} textAlign="justified" >
                                                        <Grid.Column width={6} >
                                                            <strong>ID</strong>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <strong>{data.ID}</strong>
                                                        </Grid.Column>
                                                        <Grid.Column width={6} >
                                                            <strong>Name</strong>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <strong>{data.name}</strong>
                                                        </Grid.Column>
                                                        {data.user && data.user.role === 'S' &&
                                                            <Fragment>
                                                                <Grid.Column width={6} >
                                                                    <strong>Father Name</strong>
                                                                </Grid.Column>
                                                                <Grid.Column>
                                                                    <strong>{data.fname}</strong>
                                                                </Grid.Column>
                                                            </Fragment>}
                                                        <Grid.Column width={6} >
                                                            <strong>Address</strong>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <strong>{data.address}</strong>
                                                        </Grid.Column>
                                                        {data.user && data.user.role === 'S' &&
                                                            < Fragment >
                                                                <Grid.Column width={6} >
                                                                    <strong>DOB</strong>
                                                                </Grid.Column>
                                                                <Grid.Column>
                                                                    <strong>{data.dob}</strong>
                                                                </Grid.Column>
                                                            </Fragment>
                                                        }
                                                        <Grid.Column width={6} >
                                                            <strong>Contact</strong>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <strong>{data.phone}</strong>
                                                        </Grid.Column>
                                                        {data.user && data.user.email &&
                                                            < Fragment >
                                                                <Grid.Column width={6} >
                                                                    <strong>Email</strong>
                                                                </Grid.Column>
                                                                <Grid.Column>
                                                                    <strong>{data.user.email}</strong>
                                                                </Grid.Column>
                                                            </Fragment>
                                                        }
                                                    </Grid.Row>
                                                </Grid>
                                            </Segment>
                                        </div>
                                    </Grid.Column>
                                </Grid.Column>
                            </Grid.Row> :
                            <Grid.Row>
                                <Grid.Column>
                                    <h3 style={{ color: 'red', textAlign: 'center' }}>Currently No record found please contact your Administrator!</h3>
                                </Grid.Column>
                            </Grid.Row>}
                </Grid>
            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.users
})
export default connect(mapStateToProps, { fetchUser })(Profile);