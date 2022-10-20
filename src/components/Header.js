import React, { useState, useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import UserContext from "./../user-context";
import SignIn from "./SignIn";
import Signup from "./Signup";
import Profile from './Profile';

function Header() {
  const context = useContext(UserContext);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  console.log(context);

  return (
    <Container>
      {
        context.user.isAuthenticated ?
          <Profile></Profile>
          :
          <Container>
            <Button onClick={() => setShowSignUp(true)}>Sign Up</Button>
            <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
          </Container>
      }

      <Signup showModal={showSignUp} setShowModal={setShowSignUp}></Signup>
      <SignIn showModal={showSignIn} setShowModal={setShowSignIn}></SignIn>
    </Container>
  );
}

export default Header;
