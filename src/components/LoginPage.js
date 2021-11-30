import axios from 'axios';
import React from 'react';
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {

    const login = (form) => {
        axios.post('http://localhost:9091/api/login', {
            username: form.username.value,
            password: form.password.value
        })
            .then(response => {
                if (response.status === 200) {
                    const token = response.headers.authorization
                    console.log('You are logged in')
                    console.log('Token: ' + token)
                }
            }).catch(error => {
                console.log('Cannot login')
            })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        // }
        // setValidated(true);

        login(form)
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
