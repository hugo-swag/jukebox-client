import React, { useContext } from 'react';
import UserContext from '../user-context';
import Causes from './Causes';

const Profile = () => {

  const user = useContext(UserContext);

  return (
    <>
      <h1>{user.user.username}</h1>
      <p>You have {user?.user.credits || 0 } Tokens. </p>
      <Causes />
    </>
  )
}

export default Profile;