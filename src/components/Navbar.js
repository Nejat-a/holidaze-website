import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";
import logo from "../images/logo.png";
import AuthContext from "../context/AuthContext";

export const Navbar = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [click, setclick] = useState(false);
  const [button, setButton] = useState(true);
  console.log(button);
  const handleClick = () => setclick(!click);
  const history = useHistory();
  const logout = () => {
    setAuth(null);
    history.push("/signin");
  };
  const closeMobileMenu = () => {
    setclick(false);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={logo} alt="logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/hotels"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Hotels
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/guesthouses"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Guesthouses
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/bandbs"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                B&Bs
              </Link>
            </li>
            {auth ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    <Button>Dashborad</Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signin"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    <Button onClick={logout}>Sign out</Button>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <Button buttonStyle="btn--outline">Signin</Button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
