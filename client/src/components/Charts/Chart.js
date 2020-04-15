import React, { useEffect, useState } from "react";
import Top4Tracks from "./Top4Tracks.js";
import "./Chart.css";
import Top5Albums from "./Top5Albums.js";
import Top6Artists from "./Top6Artists.js";

function Chart() {
  const [state, setState] = useState({
    isLoaded: false,
  });

  useEffect(() => {
    fetch("http://localhost:4020/")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setState({
          isLoaded: true,
          tracks: result.ChartData.tracks,
          albums: result.ChartData.albums,
          artists: result.ChartData.artists,
        });
      });
  }, []);

  return (
    <React.Fragment>
      <div className="ChartsContainer">
        <Top5Albums albums={state.albums} isLoaded={state.isLoaded} />
        <Top4Tracks tracks={state.tracks} isLoaded={state.isLoaded} />
        <Top6Artists artists={state.artists} isLoaded={state.isLoaded} />
      </div>
    </React.Fragment>
  );
}

export default React.memo(Chart);
