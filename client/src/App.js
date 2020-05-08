import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Settings from "./nav/Settings/Settings.js";
import Register from "./nav/Register/Register.js";
import Login from "./nav/Login/Login.js";
import MusicApp from "./MusicApp.js";
import "./App.css";
import MySongs from "./components/MySongs/MySongs.js";

export const UserContext = React.createContext([]);
export const BaseUrl = "http://localhost:4020";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const logOutCallback = async () => {
    await fetch(`${BaseUrl}/logout`, {
      method: "POST",
      credentials: "include", // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    if (localStorage.getItem("userName")) {
      localStorage.removeItem("userName");
      localStorage.setItem("userImage", "default.jpeg");
    }

    navigate("/");
  };

  // First thing, check if a refreshtoken exist(If USer STill Has Access)
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch(`${BaseUrl}/refresh_token`, {
          method: "POST",
          credentials: "include", // Needed to include the cookie
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (!result.accesstoken || !localStorage.getItem("userImage"))
        localStorage.setItem("userImage", "default.jpeg");

      if (result.accesstoken && !localStorage.getItem("userName"))
        logOutCallback();
      else if (result.accesstoken && localStorage.getItem("userName")) {
        localStorage.setItem("userImage", result.userImage);
        setUser({
          accesstoken: result.accesstoken,
        });
      }
      setLoading(false);
    }

    checkRefreshToken();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router id="router">
        <Settings path="/settings" logOutCallback={logOutCallback} />
        <Login path="/login" />
        <Register path="/register" />
        <MusicApp path="/" loading={loading} logOutCallback={logOutCallback} />
        <MySongs path="/MySongs" logOutCallback={logOutCallback} />
      </Router>
    </UserContext.Provider>
  );
}

export default React.memo(App);
