import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddDetail } from '../../actions/crudActions';
import { Form, Button, Container, Radio } from 'semantic-ui-react';
import { fetchUser } from '../../actions/crudActions';
import PropTypes from 'prop-types';

class AddUserDetail extends Component {
    state = {
        name: "",
        fname: "",
        phone: "",
        gender: "",
        dob: "",
        photo: "",
        address: "",
        ID: "",
        standard: "",
        email: ""
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        user: PropTypes.object
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id).then(
            res => {
                const { data } = this.props.user;
                this.setState({
                    name: data.name,
                    fname: data.fname,
                    phone: data.phone,
                    gender: data.gender,
                    address: data.address,
                    ID: data.ID,
                    standard: data.standard,
                    email: data.user.email
                })
            }
        )
    }

    onDateChange = (event, data) => this.setState({ dob: data.value });

    onSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('u_id', this.props.match.params.id)
        formData.append('name', this.state.name)
        formData.append('fname', this.state.fname)
        formData.append('standard', this.state.standard)
        formData.append('gender', this.state.gender)
        formData.append('address', this.state.address)
        formData.append('ID', this.state.ID)
        formData.append('photo', this.state.photo)
        formData.append('phone', this.state.phone)
        formData.append('dob', this.state.dob)
        formData.append('email', this.state.email)
        // saving user detail
        this.props.AddDetail(formData);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleImageChange = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
    }
    handleGenderChange = (e, { value }) => this.setState({ gender: value })
    render() {
        const { data } = this.props.user;
        return (
            <Container>
                <Form onSubmit={this.onSubmit} >
                    <Form.Group unstackable widths={2}>
                        <Form.Input label='Enroll'
                            placeholder='Enter Enroll Number'
                            onChange={this.handleChange}
                            name='ID'
                            value={this.state.ID} />

                        <Form.Input label='Name'
                            placeholder='Enter Name'
                            name='name'
                            onChange={this.handleChange}
                            value={this.state.name} />
                    </Form.Group>

                    <Form.Group widths={2}>
                        <Form.Input label='Address'
                            placeholder='Address'
                            name='address'
                            onChange={this.handleChange}
                            value={this.state.address} />
                        {data.user && data.user.role === 'S' ?
                            <Form.Input
                                type='date'
                                label='DOB'
                                onChange={this.onDateChange}
                                format='DD-MM-YYYY' /> :
                            <Form.Input
                                type='email'
                                placeholder='Enter Email'
                                label='Email'
                                onChange={this.handleChange}
                                value={this.state.email}
                                name='email' />}
                    </Form.Group>

                    <Form.Group widths={2}>
                        <Form.Input label='Father Name'
                            name='fname'
                            placeholder='Enter Father Name'
                            onChange={this.handleChange}
                            value={this.state.fname} />

                        <Form.Input label='Phone'
                            placeholder='Phone'
                            name='phone'
                            onChange={this.handleChange}
                            value={this.state.phone} />
                    </Form.Group>

                    <Form.Group widths={2}>
                        <Form.Input label='Standard'
                            placeholder='Standard'
                            name='standard'
                            onChange={this.handleChange}
                            value={this.state.standard} />

                        <Form.Input label='Photo'
                            placeholder='Select Photo'
                            type='file'
                            onChange={this.handleImageChange} />
                    </Form.Group>

                    <Form.Group widths={4} inline>
                        <Form.Field>
                            <Radio
                                label='Male'
                                name='gender'
                                value='male'
                                checked={this.state.gender === 'male'}
                                onChange={this.handleGenderChange}
                            />
                            <Radio
                                label='Female'
                                name='gender'
                                value='female'
                                checked={this.state.gender === 'female'}
                                onChange={this.handleGenderChange}
                            />

                            <Radio
                                label='Other'
                                name='gender'
                                value='other'
                                checked={this.state.gender === 'other'}
                                onChange={this.handleGenderChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    user: state.users
})
export default connect(
    mapStateToProps,
    { AddDetail, fetchUser }
)(AddUserDetail);