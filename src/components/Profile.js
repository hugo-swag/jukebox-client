import React, { useContext } from 'react';
import UserContext from '../user-context';

const Profile = () => {

  const user = useContext(UserContext);

  return (
    <h1>{user.user.username}</h1>
  )
}

export default Profile;