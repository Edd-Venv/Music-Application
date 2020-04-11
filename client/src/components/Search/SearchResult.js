import React from "react";
import "./SearchResult.css";
import AudioPlayer from "react-h5-audio-player";

function SearchResult(props) {
  const { results, handleClose } = props;
  console.log("results", results);
  return (
    <React.Fragment>
      <br />
      {results === undefined ? (
        <div>
          <p className="error-paragraph">
            ARTIST NOT IN DATABASE
            <i onClick={handleClose} className="close-error">
              ×
            </i>
          </p>
        </div>
      ) : (
        <div id="search-results-model">
          <div onClick={handleClose} className="search-results-close-button">
            ×
          </div>
          <br />
          <br />
          <br />
          <div className="search-results-container">
            {results.map((result) => {
              return (
                <div
                  className="card mb-3"
                  key={result.id}
                  style={{ width: "85%" }}
                  id="search-result-item"
                >
                  <div className="row no-gutters">
                    <div id="artist-image">
                      <img
                        src={result.artist.picture_xl}
                        style={{ width: "100%" }}
                        className="img-thumbnail"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-4" style={{ width: "30%" }}>
                      <AudioPlayer
                        volume="0.5"
                        layout="stacked"
                        src={result.preview}
                        control="false"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body" id="search-result-font">
                        <h5 className="card-title">
                          <big>
                            <strong>{result.artist.name}</strong>
                          </big>
                        </h5>
                        <div className="card-text">
                          <p>Song: {result.title}</p>
                          <p>Album: {result.album.title}</p>
                          <p>
                            <small className="text-muted">
                              Explicit Lyrics:{" "}
                              {result.explicit_lyrics === true ? "Yes" : "No"}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default SearchResult;
/*

 <div className={buttonDisplay}>
                        <button
                          className="btn btn-dark"
                          type="submit"
                          style={{
                            width: "50px",
                            marginLeft: "0%",
                          }}
                          onClick={handleButtonClick}
                        >
                          <i className="fab fa-google-play" />
                        </button>
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
*/
