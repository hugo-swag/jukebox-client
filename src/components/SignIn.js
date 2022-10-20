import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function SignIn({showModal, setShowModal}) {

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>Sign Up</Modal.Header>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSignIn}>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  )
}

async function handleSignIn(e) {
  e.preventDefault();

  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_SERVER}/user/signin`,
    auth: {
      username: e.target.username.value,
      password: e.target.password.value,
    },
  }

  const response = await axios(config);
  console.log(response.data);
}