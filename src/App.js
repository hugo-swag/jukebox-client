import { useState } from 'react';

import Header from './components/Header';
import Rooms from './components/Rooms';
import Causes from './components/Causes';

import UserContext from './user-context';
import withAuth from './WithAuth';
import Relay from './lib/Relay';

// const relay = new Relay();

const relay = new Relay()

const RoomsWithAuth = withAuth(Rooms);
function App() {

  const [user, setUser] = useState({isAuthenticated: false});
  const login = (username, token, isAuthenticated) => {
    relay.resetRelay(token);
    console.log("new Relay", relay.token)
    setUser({
      username: username,
      token: token,
      isAuthenticated: isAuthenticated
    });
  }

  return (
    <UserContext.Provider value={{...{ user: user, login: login, relay}}}>
    <div className="container">
      <Header></Header>
      <hr/>
      <RoomsWithAuth />
      <hr/>
      <Causes/>

    </div>
    </UserContext.Provider>
  );
}

export default App;
