import React from "react";
import Header from "./components/Header/Header.js";
import Search from "./components/Search/Search.js";
import Navigation from "./nav/Navigation/Navigation.js";
import Chart from "./components/Charts/Chart.js";

function MusicApp(props) {
  return (
    <React.Fragment>
      <Navigation logOutCallback={props.logOutCallback} />
      <br />
      <div
        style={{
          maxWidth: "1200px",
          minWidth: "50%",
          margin: "0 auto",
        }}
      >
        {props.loading ? (
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
            <br />
            <Chart />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
export default MusicApp;
