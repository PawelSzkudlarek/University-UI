import axios from 'axios';
import React from 'react';
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useUserUpdate } from '../contexts/UserContext';
import useToken from '../hooks/useToken';

const LoginPage = ({ setRole }) => {
    const token = useToken()
    const history = useHistory()

    const updateRole = (userRole) => {
        setRole(userRole)
    }

    const logging = (form) => {
        axios.post('http://localhost:9091/api/login', {
            username: form.username.value,
            password: form.password.value
        })
        .then(response => {
                if (response.status === 200) {
                    token.setToken(response.headers.authorization)
                    updateRole(response.headers.userrole)
                    history.push('/')
                    console.log('You are logged in')
                }
            }).catch(error => {
                console.log('Something happend when you while logging in.')
            })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        // }
        // setValidated(true);

        logging(form)
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Control type="text" placeholder="username" />
                    <Form.Text>Username or Email</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default LoginPage
