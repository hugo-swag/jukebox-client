import React from 'react';

const userContext = React.createContext({
  username: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
});

export default userContext;