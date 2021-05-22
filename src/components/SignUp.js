import homeIcon from "../images/home.png";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function SignUp({ setSignIn }) {
  //for notifications
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div className="row-container">
          <div>
            <p> </p>
          </div>
          <p onClick={() => setSignIn(true)}>Sign in</p>
        </div>
        <button>Sign Up</button>
      </div>
    </div>
  );
}
