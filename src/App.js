
import { useState } from 'react';
import Splash from './components/Splash';
import Header from './components/Header';
import Rooms from './components/Rooms';
import Profile from './components/Profile';
import UserContext from './user-context';
import withAuth from './WithAuth';
import Relay from './lib/Relay';
import WrapInModal from './components/wrapInModal';


// const relay = new Relay();

const relay = new Relay()

const RoomsWithAuth = withAuth(Rooms);
function App() {

  const [user, setUser] = useState({ isAuthenticated: false });
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const login = (username, token, isAuthenticated) => {
    relay.resetRelay(token);
    setUser({
      username: username,
      token: token,
      isAuthenticated: isAuthenticated,
      credits: 100

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

                <a href="#open-profile" onClick={(e)=>{
                  e.preventDefault();
                  setProfileIsOpen(true);
                }}>My Profile</a>
                <WrapInModal title="Profile" isShowing={profileIsOpen} handleClose={()=>setProfileIsOpen(false)}>
                <Profile/>
              </WrapInModal>
                <RoomsWithAuth />
              </>
              : <Splash></Splash>
          }
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
