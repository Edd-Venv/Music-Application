import React from "react";
import Header from "./components/Header/Header.js";
import "./App.css";

function App() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        minWidth: "50%",
        margin: "0 auto",
      }}
    >
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
    </div>
  );
}

export default App;
