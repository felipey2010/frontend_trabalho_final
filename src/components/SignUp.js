import { useState } from "react";
import homeIcon from "../images/home.png";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function SignUp({ setSignIn }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  //for notifications
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const DBRegister = "user/";

  async function handleSubmit() {
    let data = {
      nome: nome,
      email: email,
      senha: senha,
    };
    if (nome !== "" && email !== "" && senha !== "" && email.includes("@")) {
      axios
        .post(DBRegister, data)
        .then(result => {
          if (result.data.success) {
            setSenha("");
            setEmail("");
            setNome("");
            enqueueSnackbar("Cadastro bem sucedido", { variant: "success" });
          }
        })
        .catch(error => {
          enqueueSnackbar("Cadastrou Falhou", { variant: "error" });
          console.log(error);
        });
    } else {
      enqueueSnackbar("Informe todos os campos", { variant: "error" });
    }
  }

  return (
    <div className="form-container sign-up-container">
      <div className="form">
        <div className="top-container">
          <div>
            <p> </p>
          </div>
          <a href="/">
            <img src={homeIcon} className="home-icon" />
          </a>
        </div>
        <h1>Create Account</h1>
        <span>Access using your e-mail</span>
        <input
          type="text"
          placeholder="Name"
          onChange={e => setNome(e.target.value)}
        />
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
          <div>
            <p> </p>
          </div>
          <p onClick={() => setSignIn(true)}>Sign in</p>
        </div>
        <button onClick={() => handleSubmit()}>Sign Up</button>
      </div>
    </div>
  );
}
