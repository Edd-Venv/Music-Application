import React from "react";
import "./HeaderCard.css";

const HeaderCard = (props) => {
  const { state, handleClose, saveSong, handleAudioPlayer } = props;

  return (
    <div id="header-card">
      {state.DummyData ? (
        <div style={{ display: "flex", minWidth: "1000px" }}>
          <div
            className="spinner-grow text-dark"
            role="status"
            style={{ margin: "0 auto" }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <p onClick={handleClose} className="close-header-card">
            ×
          </p>
          <div
            className="card mb-3 header-card"
            id={"header-card-" + state.id}
            key={state.id}
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <div id="header-artist-image">
                  <img
                    src={state.artist.picture_xl}
                    style={{ width: "100%" }}
                    className="img-thumbnail"
                    alt="..."
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body" id="header-card-font">
                  <h5 className="card-title">
                    <big>
                      <strong>{state.artist.name}</strong>
                    </big>
                  </h5>
                  <div className="card-text">
                    <p>Song: {state.title}</p>
                    <p>Album: {state.album.title}</p>
                    <p>
                      <small className="text-muted">
                        Explicit Lyrics:{" "}
                        {state.explicit_lyrics === true ? "Yes" : "No"}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4 header-card-buttons-container"
                id={"header-card-div-" + state.id}
              >
                <button
                  className="btn btn-primary"
                  onClick={saveSong.bind(
                    this,
                    state.id,
                    state.artist.name,
                    state.artist.picture_xl,
                    state.title,
                    state.album.title,
                    state.explicit_lyrics,
                    state.preview
                  )}
                >
                  {state.message ? state.message : "Save"}
                </button>
                <div id={"header-card-div-" + state.id} />
                {state.musicAudioButtonClicked === true ? (
                  <button className="dummy-button btn">
                    Preview Song
                    <i className="fab fa-google-play" />
                  </button>
                ) : (
                  <div className={state.displayAudioButton}>
                    <button
                      className="btn btn-dark"
                      onClick={handleAudioPlayer.bind(
                        this,
                        state.id,
                        true,
                        state.preview
                      )}
                    >
                      Preview Song
                      <i className="fab fa-google-play" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default React.memo(HeaderCard);
