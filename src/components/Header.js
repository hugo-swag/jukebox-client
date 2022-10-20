import { useState } from "react";
import { Nav } from 'react-bootstrap'
import SignIn from "./SignIn";
import Signup from "./Signup";

function Header() {

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <Nav>
        <Nav.Item onClick={() => setShowSignUp(true)}>
          Sign Up
        </Nav.Item>
        <Nav.Item onClick={() => setShowSignUp(true)}>
          Sign In
        </Nav.Item>
      </Nav>

      <Signup showModal={showSignUp} setShowModal={setShowSignUp}></Signup>
      <SignIn showModal={showSignIn} setShowModal={setShowSignIn}></SignIn>
    </>
  );
}

export default Header;
