import { Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <div>
      <nav>
        <ul className="navbar-nav ">
          <li>
            <Link className="nav-link" to="/">
              Homepage
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavComponent;
