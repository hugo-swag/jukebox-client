import React from 'react';
import Header from './components/Header';
import Rooms from './components/Rooms';

import Relay from './lib/Relay';
const relay = new Relay();

function App() {
  return (
    <div className="container">
      <Header></Header>
      <hr/>
      <Rooms relay={relay}/>
      <hr/>

    </div>
  );
}

export default App;
