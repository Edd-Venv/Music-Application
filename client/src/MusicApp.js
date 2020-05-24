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
      <div>
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
            <h2 className="current-top-three-artists-heading">
              CURRENT TOP THREE ARTISTS
              <hr style={{ margin: "0 auto" }} />
            </h2>
            <br />
            <Header />
            <br />
            <h1>CHARTS</h1>
            <div style={{ width: "95%" }}>
              <span className="row">
                <h2 className="top-5-albums-heading">
                  TOP 5 ALBUMS
                  <hr style={{ width: "100%" }} />
                </h2>
                <h2 className="top-5-tracks-heading">
                  TOP 5 TRACKS
                  <hr style={{ width: "100%" }} />
                </h2>
              </span>
            </div>
            <Chart />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
export default MusicApp;
