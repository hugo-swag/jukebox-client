import Header from './components/Header';
import { useState } from 'react';
import UserContext from './user-context';
import Rooms from './components/Rooms';
import Causes from './components/Causes';
import Relay from './lib/Relay';

const relay = new Relay();

function App() {

  const [user, setUser] = useState({isAuthenticated: false});
  const login = (username, token, isAuthenticated) => {
    setUser({
      username: username,
      token: token,
      isAuthenticated: isAuthenticated,
    });
  }

  return (
    <UserContext.Provider value={{ user: user, login: login}}>
       <div className="container">
      <Header></Header>
      <hr/>
      <Rooms relay={relay}/>
      <hr/>
      <Causes/>

    </div>
    </UserContext.Provider>
  );
}

export default App;
