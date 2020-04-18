import React, { useContext } from "react";
import { UserContext } from "../../App.js";
import { Link, useMatch } from "@reach/router";
import UserLogo from "./UserLogo.js";
import { GoGear, GoPerson } from "react-icons/go";

const Navigation = ({ logOutCallback }) => {
  const [user] = useContext(UserContext);

  const showRegister = () => {
    if (!user.accesstoken)
      return (
        <Link className="nav-link" to="/register">
          Register<span className="sr-only">(current)</span>
        </Link>
      );
    else return null;
  };

  const showLogOut = () => {
    if (user.accesstoken)
      return (
        <p
          className="nav-link"
          onClick={logOutCallback}
          style={{ paddingTop: "1.3rem", cursor: "pointer" }}
          id="logoutButton"
        >
          LogOut
        </p>
      );
    else return null;
  };

  const showLogin = () => {
    if (!user.accesstoken)
      return (
        <Link className="nav-link" to="/login">
          Login<span className="sr-only">(current)</span>
        </Link>
      );
    else return null;
  };

  const showSettings = () => {
    if (user.accesstoken)
      return (
        <Link className="nav-link" to="/settings">
          <GoGear />
        </Link>
      );
    else return null;
  };

  const useShowMySongs = () => {
    const match = useMatch("/MySongs");
    if (match !== null) return null;
    else
      return (
        <Link className="nav-link" to="/MySongs">
          MySongs<span className="sr-only">(current)</span>
        </Link>
      );
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav" style={{ fontSize: "1.7rem" }}>
            <li className="nav-item active">
              <a className="nav-link" href=" ">
                Applications <span className="sr-only">(current)</span>
              </a>
            </li>
            <li>
              <Link className="nav-link active" to="/">
                Home<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">{useShowMySongs()}</li>
            <li className="nav-item active">{showLogin()}</li>
            <li className="nav-item active">{showRegister()}</li>
            <li className="nav-item active">{showLogOut()}</li>
            <li className="nav-item active">
              <a
                className="nav-link"
                href="https://github.com/Edd-Venv/Book-App"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">{showSettings()}</li>
          </ul>
        </div>
        <div>
          <GoPerson />
          <UserLogo />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
