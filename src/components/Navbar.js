import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

export default function Navbar({ user, signedIn, setSignedIn }) {
  //for notifications
  const { enqueueSnackbar } = useSnackbar();

  const DBLogout = "user/logout/";

  async function handleLogout(data) {
    if (!data) {
      return;
    }

    axios
      .post(DBLogout + data.id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Logout Successful", { variant: "success" });
          //clear token
          localStorage.clear();
          setSignedIn(false);
        }
      })
      .catch(error => {
        enqueueSnackbar("Logout failed", { variant: "error" });
        console.log(error);
      });
  }

  return (
    <nav className="navbar">
      <h1>Tech News Blog</h1>
      <div className="links">
        <Link to="/">Pagina Inicial</Link>
        <Link to="/categorias">Categorias </Link>
        {signedIn ? (
          <Link to="/posts/criar-noticia">Criar Notícia</Link>
        ) : (
          <Link to="/user/login">Login </Link>
        )}
        {signedIn && (
          <Link to="/" onClick={() => handleLogout(user)}>
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
}
