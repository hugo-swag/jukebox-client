import { Form, Button, Modal } from 'react-bootstrap';
import React, { useContext } from 'react';
import UserContext from '../user-context';
import axios from 'axios';

export default function SignIn({showModal, setShowModal}) {

  const user = useContext(UserContext);

  async function handleSignIn(e) {
    e.preventDefault();
    setShowModal(false);

    const config = {
      method: 'post',
      mode: 'cors',
      url: `${process.env.REACT_APP_SERVER_URL}/user/signin`,
      auth: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    }
  
    try {
      const response = await axios(config);
      user.login(response.data.username, response.data.token, true);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>Sign In</Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}