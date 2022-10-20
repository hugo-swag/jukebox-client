import React from 'react';
import Header from './components/Header';
import Rooms from './components/Rooms';
import Causes from './components/Causes';

import Relay from './lib/Relay';
const relay = new Relay();

function App() {
  return (
    <div className="container">
      <Header></Header>
      <hr/>
      <Rooms relay={relay}/>
      <hr/>
      <Causes/>

    </div>
  );
}

export default App;
