import { Link } from "react-router-dom";

export default function Navbar({ user, signedIn }) {
  return (
    <nav className="navbar">
      <h1>Tech News Blog</h1>
      <div className="links">
        <Link to="/">Pagina Inicial</Link>
        <Link to="/">Categorias </Link>
        {signedIn ? (
          <Link to="/criar-noticia">Criar Notícia</Link>
        ) : (
          <Link to="/login">Login </Link>
        )}
      </div>
    </nav>
  );
}
