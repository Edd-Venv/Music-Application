import React, { useEffect, useState } from "react";
import Top4Tracks from "./Top4Tracks.js";
import "./Chart.css";

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
          tracks: result.data.ChartData.tracks,
        });
      });
  }, []);

  return (
    <React.Fragment>
      <div className="ChartsContainer">
        <Top4Tracks tracks={state.tracks} isLoaded={state.isLoaded} />
      </div>
    </React.Fragment>
  );
}

export default React.memo(Chart);
