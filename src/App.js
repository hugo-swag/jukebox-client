
import { useState } from 'react';
import Splash from './components/Splash';
import Header from './components/Header';
import Causes from './components/Causes';
import UserContext from './user-context';
import Relay from './lib/Relay';


// const relay = new Relay();

const relay = new Relay()

// const RoomsWithAuth = withAuth(Rooms);
function App() {

  const [user, setUser] = useState({ isAuthenticated: false });
  const login = (username, token, isAuthenticated) => {
    relay.resetRelay(token);
    setUser({
      username: username,
      token: token,
      isAuthenticated: isAuthenticated
    });
  }

  return (
    <>
      <UserContext.Provider value={{ ...{ user: user, login: login, relay } }}>
        <div>
          {
            user.isAuthenticated
              ?
              <>
                <Header></Header>
                <Causes />
              </>
              : <Splash></Splash>
          }
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
