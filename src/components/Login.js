import { useState } from "react";
import "../styles/login.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Redirect, useLocation } from "react-router-dom";

export default function Login({ signedIn, setSignedIn }) {
  const [signIn, setSignIn] = useState(true);

  let location = useLocation();

  if (signedIn) {
    return (
      // User already signed in so return to home page
      <Redirect
        to={{
          pathname: "/",
          state: { from: location.pathname },
        }}
      />
    );
  } else {
    return (
      <div className="main-body">
        <div className="container" id="container">
          {signIn ? (
            <SignIn setSignIn={setSignIn} setSignedIn={setSignedIn} />
          ) : (
            <SignUp setSignIn={setSignIn} />
          )}
        </div>
      </div>
    );
  }
}
