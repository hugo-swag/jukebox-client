import React, { useContext } from 'react';
import userContext from "./user-context";

function withAuth(Component) {
  return (props) => {
    const authContext = useContext(userContext);
    console.log("is Auth", authContext.isAuthenticated)
    console.log("is Auth", authContext)
    if(authContext?.user){
      return(
      <Component
        {...props}
        {...authContext}
      />)
      }
      else {
        return (
          <div>
            Please login...
          </div>
        )
      }
  };
}

export default withAuth;