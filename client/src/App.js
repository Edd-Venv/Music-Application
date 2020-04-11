import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Header from "./components/Header/Header.js";
import Search from "./components/Search/Search.js";
import "./App.css";

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const logOutCallback = async () => {
    await fetch("http://localhost:4020/logout", {
      method: "POST",
      credentials: "include", // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    navigate("/");
  };

  // First thing, check if a refreshtoken exist(If USer STill Has Access)
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch("http://localhost:4020/refresh_token", {
          method: "POST",
          credentials: "include", // Needed to include the cookie
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setUser({
        accesstoken: result.accesstoken,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1200px",
        minWidth: "50%",
        margin: "0 auto",
      }}
    >
      {loading ? (
        <div
          className="spinner-grow text-dark"
          role="status"
          style={{ margin: "auto" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <React.Fragment>
          <Search />
          <br />
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bolder",
              textAlign: "center",
              color: "white",
            }}
          >
            CURRENT TOP THREE ARTISTS
            <hr style={{ width: "22%", margin: "0 auto" }} />
          </h2>
          <br />
          <Header />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
