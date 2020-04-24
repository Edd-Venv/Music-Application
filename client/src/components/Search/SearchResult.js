import React, { useContext, useState, useEffect } from "react";
import "./SearchResult.css";
import { UserContext } from "../../App.js";
import ArtistInfo from "./ArtistInfo.js";
import { BaseUrl } from "../../App.js";

function SearchResult(props) {
  let timeOut;
  const [user] = useContext(UserContext);
  const [state, setState] = useState({
    key: 0,
    message: "Save",
    displayAudioButton: "show-music-button",
  });

  const {
    results,
    handleClose,
    handleHideArtistInfoButton,
    handleShowArtistInfoButton,
  } = props;

  async function saveSong(...Args) {
    if (!user.accesstoken) {
      if (timeOut) {
        clearTimeout(timeOut);
      }
      return setState({
        key: Args[0],
        message: "You need to login to Save.",
        displayAudioButton: "show-music-button",
      });
    } else {
      const result = await (
        await fetch(`${BaseUrl}/search/saveSong`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`,
          },
          body: JSON.stringify({
            song_key: Args[0],
            artist_name: Args[1],
            artist_image: Args[2],
            song_title: Args[3],
            album_title: Args[4],
            explicit_lyrics: Args[5],
            song: Args[6],
          }),
        })
      ).json();

      if (!result.error) {
        setState({
          ...state,
          key: result.key,
          message: result.message,
          musicAudioButtonClicked: false,
          displayAudioButton: "show-music-button",
        });
      } else {
        setState({ message: result.error });
      }
    }
  }

  async function musicAudioButton(Args) {
    const result = await (
      await fetch(`${BaseUrl}/buttonUI`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_key: Args[0],
          music_audio_button_click: Args[1],
        }),
      })
    ).json();

    if (!result.error) {
      setState({
        key: result.key,
        message: "Save",
        musicAudioButtonClicked: result.musicAudioButtonClicked,
        displayAudioButton: "show-music-button",
      });
      if (timeOut) {
        clearTimeout(timeOut);
      }
    } else {
      console.log("message", result.error);
    }
  }

  useEffect(() => {
    if (state.message !== "Save") {
      timeOut = setTimeout(() => {
        setState({ ...state, message: "Save" });
      }, 3000);
    }
  }, [state.message]);

  return (
    <React.Fragment>
      <br />
      <ArtistInfo
        results={results}
        handleHideArtistInfoButton={handleHideArtistInfoButton}
      />
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
        <React.Fragment>
          <div id="search-results-model">
            <div onClick={handleClose} className="search-results-close-button">
              ×
            </div>
            <div className="artist-info-button-container">
              {results.video[0].Type === "unknown" ? null : (
                <button
                  className="btn btn-dark"
                  onClick={handleShowArtistInfoButton}
                >
                  <svg
                    className="bi bi-info-circle-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            <br />
            <br />
            <div className="search-results-container">
              {results.songs[0].DummyData ? (
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
                results.songs.map((result) => {
                  return (
                    <div
                      className="card mb-3 search-result-grid-card"
                      key={result.id}
                      id="search-result-item"
                    >
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <div id="artist-image">
                            <img
                              src={result.artist.picture_xl}
                              style={{ width: "100%" }}
                              className="img-thumbnail"
                              alt="..."
                            />
                          </div>
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
                                  {result.explicit_lyrics === true
                                    ? "Yes"
                                    : "No"}
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 search-result-buttons-container">
                          <button
                            className="btn btn-primary"
                            onClick={saveSong.bind(
                              this,
                              result.id,
                              result.artist.name,
                              result.artist.picture_xl,
                              result.title,
                              result.album.title,
                              result.explicit_lyrics,
                              result.preview
                            )}
                          >
                            {result.id === state.key ? state.message : "Save"}
                          </button>
                          {result.id === state.key &&
                          state.musicAudioButtonClicked === true ? (
                            <audio
                              id="search-result-audio-player"
                              src={result.preview}
                              volume="0.5"
                              controls
                            />
                          ) : (
                            <div className={state.displayAudioButton}>
                              <button
                                className="btn btn-dark"
                                type="submit"
                                onClick={musicAudioButton.bind(this, [
                                  result.id,
                                  true,
                                ])}
                              >
                                Song Preview
                                <i className="fab fa-google-play" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default SearchResult;
