import React, { useEffect, useState } from "react";
import Top5Tracks from "./Top5Tracks.js";
import "./Chart.css";
import Top5Albums from "./Top5Albums.js";

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
        <Top5Tracks tracks={state.tracks} isLoaded={state.isLoaded} />
      </div>
    </React.Fragment>
  );
}

export default Chart;
/*<Top6Artists artists={state.artists} isLoaded={state.isLoaded} /> */
