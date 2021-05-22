import { useState } from "react";
import "../styles/login.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";

const Login = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="main-body">
      <div className="container" id="container">
        {signIn ? (
          <SignIn setSignIn={setSignIn} />
        ) : (
          <SignUp setSignIn={setSignIn} />
        )}
      </div>
    </div>
  );
};

export default Login;
