import React, { useState } from "react";
import "./Top5Tracks.css";

function Top5Tracks(props) {
  const [state, setState] = useState({
    key: 0,
    buttonDisplay: "show-top-5-audio-button",
  });

  async function buttonUI(key) {
    const result = await (
      await fetch("http://localhost:4020/buttonUI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_key: key,
        }),
      })
    ).json();

    if (!result.error) {
      setState({
        key: result.key,
        buttonDisplay: "show-top-5-audio-button",
      });
    } else {
      console.log("message", result.error);
    }
  }

  const { tracks, isloaded } = props;

  return (
    <div className="top-5-tracks-container">
      {isloaded === false || tracks === undefined
        ? null
        : tracks.map((track) => {
            return (
              <div className="card mb-3" key={track.id} id="top-5-chart-card">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <div className="top-5-tracks-image-container">
                      <img
                        src={track.artist.picture}
                        className="img-thumbnail"
                        alt="..."
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body" style={{ marginLeft: "3%" }}>
                      <h5 className="card-title">
                        <big>
                          <strong>{track.title}</strong>
                        </big>
                      </h5>
                      <p className="card-text">Artist: {track.artist.name}</p>
                      <p className="card-text">
                        Top 5 postion: {track.position}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Explicit Lyrics:{" "}
                          {track.explicit_lyrics === true ? "Yes" : "No"}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4" style={{ marginLeft: "15px" }}>
                    {track.id === state.key ? (
                      <audio
                        id="top-5-tracks-audio-player"
                        src={track.preview}
                        volume="0.5"
                        controls
                      />
                    ) : (
                      <div className={state.buttonDisplay}>
                        <button
                          className="btn btn-dark"
                          onClick={buttonUI.bind(this, track.id)}
                        >
                          Preview Song
                          <i className="fab fa-google-play" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <br />
              </div>
            );
          })}
    </div>
  );
}
export default Top5Tracks;
