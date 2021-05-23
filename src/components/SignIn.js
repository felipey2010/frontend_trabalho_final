import { useState } from "react";
import homeIcon from "../images/home.png";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function SignIn({ setSignIn, setSignedIn }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  //for notifications
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const DBUser = "user/login";

  async function authenticateUser() {
    if (email !== "" && senha !== "") {
      let data = {
        email: email,
        senha: senha,
      };
      axios
        .post(DBUser, data)
        .then(result => {
          if (result.data.success) {
            setSenha("");
            setEmail("");
            enqueueSnackbar("Acesso Permitido", { variant: "success" });
            //store token
            localStorage.setItem("token", result.data.token);
            setSignedIn(true);
          }
        })
        .catch(error => {
          enqueueSnackbar("Acesso Negado", { variant: "error" });
          console.log(error);
          setSignedIn(false);
        });
    } else {
      enqueueSnackbar("Informe todos os campos", { variant: "error" });
    }
  }

  return (
    <div className="form-container sign-in-container">
      <div className="form">
        <div className="top-container">
          <div>
            <p> </p>
          </div>
          <a href="/">
            <img src={homeIcon} className="home-icon" />
          </a>
        </div>
        <h1>Sign in</h1>
        <span>Use your account details</span>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setSenha(e.target.value)}
        />
        <div className="row-container">
          <a href="#">Forgot your password?</a>
          <p onClick={() => setSignIn(false)}>Create Account</p>
        </div>
        <button onClick={() => authenticateUser()}>Sign In</button>
      </div>
    </div>
  );
}
