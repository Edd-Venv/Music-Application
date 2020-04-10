import React from "react";
import "./SearchResult.css";
import AudioPlayer from "react-h5-audio-player";

class SearchResult extends React.Component {
  render() {
    const {
      search,
      display,
      stopAudio,
      Test,
      Video,
      buttonDisplay,
      displayAudioPlayer,
      handleClick,
      handleButtonClick
    } = this.props;
    return (
      <div className={display}>
        <br />
        {search === undefined ? (
          <div>
            <p className="error-paragraph">
              ARTIST NOT IN DATABASE
              <i onClick={handleClick} className="close-error">
                ×
              </i>
            </p>
          </div>
        ) : (
          <div className="search-result-container">
            <div className="card mb-3" key={search.id} id="boxSearcher">
              <span onClick={handleClick} className="close">
                ×
              </span>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <div className="artists-image">
                    <img
                      src={search.artist.picture_xl}
                      className="img-thumbnail"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col-md-8" style={{ paddingLeft: "13px" }}>
                  <div className="card-body" id="search-result-font-size">
                    <h5 className="card-title">
                      <big>
                        <strong>{search.artist.name}</strong>
                      </big>
                    </h5>
                    <div className="card-text">
                      <p>Song: {search.title}</p>
                      <p>Album: {search.album.title}</p>
                      <p>
                        <small className="text-muted">
                          Explicit Lyrics:{" "}
                          {search.explicit_lyrics === true ? "Yes" : "No"}
                        </small>
                      </p>
                    </div>
                    <React.Fragment>
                      <div className={buttonDisplay}>
                        <button
                          className="btn btn-dark"
                          type="submit"
                          style={{
                            width: "50px",
                            marginLeft: "0%"
                          }}
                          onClick={handleButtonClick}
                        >
                          <i className="fab fa-google-play" />
                        </button>
                      </div>
                      <div className={displayAudioPlayer}>
                        <AudioPlayer
                          src={search.preview}
                          controls
                          volume={parseInt(stopAudio)}
                        />
                      </div>
                    </React.Fragment>
                  </div>
                </div>
                {Test === "unknown" ? (
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "black",
                      marginLeft: "3%",
                      fontWeight: "bold"
                    }}
                  >
                    VIDEO NOT IN DATABASE
                  </p>
                ) : (
                  <React.Fragment>
                    <h5
                      style={{
                        fontSize: "1.2em",
                        color: "black",
                        fontWeight: "bold",
                        marginLeft: "8%"
                      }}
                    >
                      Hit Video
                    </h5>
                    <iframe
                      src={Video}
                      className="iframe"
                      title="This is a unique title prop"
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchResult;
