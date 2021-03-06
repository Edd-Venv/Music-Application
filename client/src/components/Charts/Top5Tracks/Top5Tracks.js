import React, { useState } from "react";
import { top5TracksAudioTag } from "./Utils.js";
import "./Top5Tracks.css";

function Top5Tracks(props) {
  const [state, setState] = useState({
    key: 0,
    buttonDisplay: "show-top-5-audio-button",
  });

  const handleAudioPlayer = (Args) => {
    top5TracksAudioTag(Args[0], state.key, Args[1]);
    setState({
      key: Args[0],
      buttonDisplay: "show-top-5-audio-button",
    });
  };

  const { tracks, isloaded } = props;

  return (
    <div className="top-5-tracks-container">
      {isloaded === false || tracks === undefined
        ? null
        : tracks.map((track) => {
            return (
              <div key={track.id} id="top-5-chart-card">
                <div className="card mb-3" id={`top-5-chart-card-${track.id}`}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <div className="top-5-tracks-image-container">
                        <img
                          src={track.artist.picture_xl}
                          className="img-thumbnail"
                          alt="..."
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body" style={{ marginLeft: "3%" }}>
                        <h5
                          className="card-title"
                          style={{ fontFamily: "Oswald, sans-serif" }}
                        >
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
                    <div
                      className="col-md-4"
                      style={{ marginLeft: "15px" }}
                      id={"top-5-tracks-div-" + track.id}
                    >
                      {track.id === state.key ? (
                        <button
                          className="btn btn-dark"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "transparent",
                          }}
                        >
                          Preview Song
                          <i className="fab fa-google-play" />
                        </button>
                      ) : (
                        <div className={state.buttonDisplay}>
                          <button
                            className="btn btn-dark"
                            onClick={handleAudioPlayer.bind(this, [
                              track.id,
                              track.preview,
                            ])}
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
              </div>
            );
          })}
    </div>
  );
}
export default React.memo(Top5Tracks);
