import homeIcon from "../images/home.png";

export default function SignIn({ setSignIn }) {
  return (
    <div className="form-container sign-in-container">
      <form action="#">
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
      </form>
    </div>
  );
}
