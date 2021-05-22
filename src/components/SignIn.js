import homeIcon from "../images/home.png";
import axios from "axios";

export default function SignIn({ setSignIn, setSignedIn }) {
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
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div className="row-container">
          <a href="#">Forgot your password?</a>
          <p onClick={() => setSignIn(false)}>Create Account</p>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
}
