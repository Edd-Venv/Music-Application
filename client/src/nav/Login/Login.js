import React, { useState, useContext, useRef, useEffect } from "react";
import { navigate, Link } from "@reach/router";

import handleToolTip from "../Utils/tooltip.js";
import { UserContext, BaseUrl } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";
import "./Login.css";

const Login = (props) => {
  const [, setUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [state, setState] = useState({ message: "" });
  const [password, setPassword] = useState("");
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  const firstKeyDown = (event) => {
    if (event.key === "Enter") passwordRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await (
      await fetch(`${BaseUrl}/login`, {
        method: "POST",
        credentials: "include", // Needed to include the cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_name: name,
          password: password,
        }),
      })
    ).json();

    if (result.accesstoken) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userImage", result.userImage);
      setUser({
        accesstoken: result.accesstoken,
      });
      navigate("/");
    } else {
      setState({ message: result.error });
      console.log(result.error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value.toUpperCase());
    } else {
      setPassword(e.target.value);
    }
  };

  const { displayLogin } = props;
  handleToolTip("login-tool-tip", "login-user-name-input", "login-form");

  return (
    <React.Fragment>
      <Navigation />
      <div className={displayLogin}>
        <form
          className="card mb-3"
          onSubmit={handleSubmit}
          id="login-form"
          autoComplete="off"
        >
          <h3 style={{ textAlign: "center" }}>LOGIN</h3>
          <div className="form-group">
            <label htmlFor="name"></label>
            <input
              id="login-user-name-input"
              className="login-inputs form-control"
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="User Name"
              required
              ref={userNameRef}
              onKeyDown={firstKeyDown}
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            />
          </div>
          <div />
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              className="login-inputs form-control"
              value={password}
              onChange={handleChange}
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
          </div>
          <Link to="/forgotPassword" id="forgot-password-link">
            Forgot your password?<span className="sr-only">(current)</span>
          </Link>
          <br />
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Login);
