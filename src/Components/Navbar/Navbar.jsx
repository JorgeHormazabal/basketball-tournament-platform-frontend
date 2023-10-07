import "./navbar.css";
import { Link} from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="header">
      <div className="logo">
      <Link to="/" className="titulo">
        <img src="/src/assets/img/icon.png"/>
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
      </ul>
      </nav>
      <Link to="/login" className="btn"><button>Iniciar Sesión</button></Link>
    </header>
  );
};




