import React, { useState, useRef, useEffect } from "react";
import { navigate } from "@reach/router";

import handleToolTip from "../Utils/tooltip.js";
import { BaseUrl } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";
import "./ForgotPassword.css";

const ForgotPassword = (props) => {
  const [name, setName] = useState("");
  const [state, setState] = useState({ message: "" });
  const [email, setEmail] = useState("");
  const userNameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  const firstKeyDown = (event) => {
    if (event.key === "Enter") emailRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await (
      await fetch(`${BaseUrl}/forgotPassword`, {
        method: "POST",
        credentials: "include", // Needed to include the cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          email: email,
        }),
      })
    ).json();

    if (result.status === "success") {
      navigate("/");
    } else {
      setState({ message: result.error });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value.toUpperCase());
    } else {
      setEmail(e.target.value);
    }
  };

  handleToolTip(
    "forgot-password-tool-tip",
    "forgot-password-user-name-input",
    "forgot-password-form"
  );

  return (
    <React.Fragment>
      <Navigation />
      <div>
        <form
          className="card mb-3"
          onSubmit={handleSubmit}
          id="forgot-password-form"
          autoComplete="off"
        >
          <div className="form-group">
            <label htmlFor="name"></label>
            <input
              id="forgot-password-user-name-input"
              className="forgot-password-inputs form-control"
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
          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              className="forgot-password-inputs form-control"
              value={email}
              onChange={handleChange}
              type="text"
              name="email"
              placeholder="email"
              required
              ref={emailRef}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            SEND
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default React.memo(ForgotPassword);
