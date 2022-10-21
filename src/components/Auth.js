import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import UserContext from "./../user-context";
import SignIn from "./SignIn";
import Signup from "./Signup";
import Profile from './Profile';
import Logout from './Logout';
import '../styles/Splash.css';

function Auth() {
  const context = useContext(UserContext);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div>
      {
        context.user.isAuthenticated ?
          <Container>
            <Profile></Profile>
            <Logout></Logout>
          </Container>
          :
          <div className="auth">
            <Button className="w-100 btn btn-lg btn-primary m-1" onClick={() => setShowSignIn(true)}>Sign In</Button>
            <Button className="w-100 btn btn-lg btn-primary m-1" onClick={() => setShowSignUp(true)}>Sign Up</Button>
          </div>
      }

      <Signup showModal={showSignUp} setShowModal={setShowSignUp}></Signup>
      <SignIn showModal={showSignIn} setShowModal={setShowSignIn}></SignIn>
    </div>
  );
}

export default Auth;
