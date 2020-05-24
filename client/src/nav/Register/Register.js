import React, { useState, useEffect, useRef, useContext } from "react";
import handleLoginAndRegister from "../Utils/RegisterFunc.js";
import handleToolTip from "../Utils/tooltip.js";
import { navigate } from "@reach/router";
import { UserContext, BaseUrl } from "../../App.js";
import Navigation from "../Navigation/Navigation";
import Axios from "axios";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [, setUser] = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [state, setState] = useState({ message: "" });
  const [file, setFile] = useState(null);
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

    (async function () {
      if (file) {
        const formData = new FormData();
        formData.append("person_name", `${name}`);
        formData.append("password", `${password}`);
        formData.append("photo", file, "photo");

        const register = await Axios.post(`${BaseUrl}/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (register.data.status === "success") navigate("/login");
      } else {
        const register = await (
          await handleLoginAndRegister(`${BaseUrl}/register`, name, password)
        ).json();

        if (register.status === "error") {
          setState({ message: register.error });
        } else if (register.status === "success") {
          const result = await (
            await handleLoginAndRegister(`${BaseUrl}/login`, name, password)
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
          }
        }
      }
    })();
  };

  const handleChange = (event) => {
    if (event.currentTarget.name === "name") {
      setName(event.currentTarget.value.toUpperCase());
    } else if (event.currentTarget.name === "password") {
      setPassword(event.currentTarget.value);
    } else {
      const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
      setFile(blob);
    }
  };
  handleToolTip(
    "register-tool-tip",
    "register-user-name-input",
    "register-form"
  );

  return (
    <React.Fragment>
      <Navigation displayLogin={"dontDisplayLoginForm"} />
      <form
        className="card mb-3"
        onSubmit={handleSubmit}
        id="register-form"
        autoComplete="off"
      >
        <h3 style={{ textAlign: "center" }}>REGISTER</h3>
        <div className="form-group">
          <label htmlFor="name"></label>
          <input
            id="register-user-name-input"
            className="register-inputs form-control"
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="User Name"
            required
            onKeyDown={firstKeyDown}
            ref={userNameRef}
            style={{ fontFamily: "Roboto Condensed, sans-serif" }}
          />
        </div>
        <div />
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            className="register-inputs form-control"
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
        <div className="form-group">
          <label htmlFor="photo" className="custom-file-upload">
            Click To Add Photo ( Optional )
            <input
              className="register-file-input"
              onChange={handleChange}
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          REGISTER
        </button>
      </form>
    </React.Fragment>
  );
};

export default Register;
