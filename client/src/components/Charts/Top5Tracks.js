import React, { useState } from "react";
import "./Top5Tracks.css";

function Top5Tracks(props) {
  const [state, setState] = useState({
    key: 0,
    buttonDisplay: "show-top-5-audio-button",
  });

  const handleAudioPlayer = (...Args) => {
    if (!document.getElementById("top-5-tracks-audio-tag-" + Args[0])) {
      const audioPlayer = document.createElement("audio");
      audioPlayer.id = "top-5-tracks-audio-tag-" + Args[0];
      audioPlayer.className = "top-5-tracks-audio-player";

      if (document.getElementById("top-5-tracks-audio-tag-" + state.key)) {
        document
          .getElementById("top-5-tracks-div-" + state.key)
          .removeChild(
            document.getElementById("top-5-tracks-audio-tag-" + state.key)
          );
      }

      if (document.getElementById("top-5-chart-card-" + state.key)) {
        const top5Card = document.getElementById(
          "top-5-chart-card-" + state.key
        );
        top5Card.style.backgroundColor = "#ffffff";
      }
      if (document.getElementById("top-5-chart-card-" + Args[0])) {
        const top5Card = document.getElementById("top-5-chart-card-" + Args[0]);
        top5Card.style.backgroundColor = "#f2f3f6";
      }

      if (document.getElementById("top-5-tracks-div-" + Args[0])) {
        const hostElement = document.getElementById(
          "top-5-tracks-div-" + Args[0]
        );
        hostElement.appendChild(audioPlayer);

        audioPlayer.style.position = "absolute";
        audioPlayer.style.left = 0 + "px";
        audioPlayer.style.top = -3 + "px";
        audioPlayer.src = Args[1];
        audioPlayer.volume = "0.5";
        audioPlayer.controls = true;
      }
    }
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
              <div id="top-5-chart-card">
                <div
                  className="card mb-3"
                  key={track.id}
                  id={`top-5-chart-card-${track.id}`}
                >
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
                          }}
                        >
                          Preview Song
                          <i className="fab fa-google-play" />
                        </button>
                      ) : (
                        <div className={state.buttonDisplay}>
                          <button
                            className="btn btn-dark"
                            onClick={handleAudioPlayer.bind(
                              this,
                              track.id,
                              track.preview
                            )}
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
