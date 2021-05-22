import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Tech News Blog</h1>
      <div className="links">
        <Link to="/">Pagina Inicial</Link>
        <Link to="/categories">Categorias </Link>
        <Link to="/login">Login </Link>
      </div>
    </nav>
  );
};

export default Navbar;
