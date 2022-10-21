
import Splash from './components/Splash';
import { useState } from 'react';
import Rooms from './components/Rooms';
// import Causes from './components/Causes';
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
  //const ProfileInModal = wrapInModal(<Profile />, profileIsOpen, () => setProfileIsOpen(false) );
  const login = (username, token, isAuthenticated) => {
    relay.resetRelay(token);
    setUser({
      username: username,
      token: token,
      isAuthenticated: isAuthenticated

    });
  }

  return (
    <UserContext.Provider value={{ ...{ user: user, login: login, relay } }}>
      <div>
        {
          user.isAuthenticated
            ?
            <>
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
  );
}

export default App;
