import Header from './components/Header';
import { useState } from 'react';
import UserContext from './user-context';

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
      <Header></Header>
    </UserContext.Provider>
  );
}

export default App;
