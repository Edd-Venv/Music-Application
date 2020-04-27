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
            id={"header-card-" + state.data.id}
            key={state.data.id}
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <div id="header-artist-image">
                  <img
                    src={state.data.artist.picture_xl}
                    style={{ width: "100%" }}
                    id={"header-card-img-" + state.data.id}
                    className="img-thumbnail"
                    alt="..."
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body" id="header-card-font">
                  <h5
                    className="card-title"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    <big>
                      <strong>{state.data.artist.name}</strong>
                    </big>
                  </h5>
                  <div className="card-text">
                    <p>Song: {state.data.title}</p>
                    <p>Album: {state.data.album.title}</p>
                    <p>
                      <small className="text-muted">
                        Explicit Lyrics:{" "}
                        {state.data.explicit_lyrics === true ? "Yes" : "No"}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4 header-card-buttons-container"
                id={"header-card-div-" + state.data.id}
              >
                <button
                  className="btn btn-primary"
                  onClick={saveSong.bind(this, [
                    state.data.id,
                    state.data.artist.name,
                    state.data.artist.picture_xl,
                    state.data.title,
                    state.data.album.title,
                    state.data.explicit_lyrics,
                    state.data.preview,
                  ])}
                >
                  {state.message ? state.message : "Save"}
                </button>
                <div id={"header-card-div-" + state.data.id} />
                {state.musicAudioButtonClicked === true ? (
                  <button className="dummy-button btn">
                    Preview Song
                    <i className="fab fa-google-play" />
                  </button>
                ) : (
                  <div className={state.displayAudioButton}>
                    <button
                      className="btn btn-dark"
                      onClick={handleAudioPlayer.bind(this, [
                        state.data.id,
                        true,
                        state.data.preview,
                      ])}
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
