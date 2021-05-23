import { useState, useEffect } from "react";
import "../styles/login.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Redirect, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  //for notifications
  const { enqueueSnackbar } = useSnackbar();

  let location = useLocation();

  //url to api request for verifying token
  const dbRequest = "user/verify_token/";

  //Get users from the database
  async function checkToken() {
    //Check local storage for token
    const token = localStorage.getItem("token");
    if (token !== null) {
      //if there is a token, then user has already signed in...verify the user's token
      axios
        .post(dbRequest + token)
        .then(result => {
          if (result.data.success) {
            setSignedIn(true);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setSignedIn(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (signedIn) {
    enqueueSnackbar("Usuário já está logado", { variant: "success" });
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
};

export default Login;
