import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="titulo">
          <img src="img/icon.png" />
          Tromü
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/proximos">Próximos</Link>
          </li>
          <li>
            <Link to="/pasados">Pasados</Link>
          </li>
          <li>
            <Link to="/ligas">Ligas</Link>
          </li>
          <li>
            <Link to="/clubes">Clubes</Link>
          </li>
          <li>
            <Link to="/organizadores">Organizadores</Link>
          </li>
        </ul>
      </nav>
      <Link to="/login" className="btn">
        <button>Iniciar Sesión</button>
      </Link>
    </header>
  );
};
