import React, { useContext, useState, useEffect } from "react";
import "./SearchResult.css";
import { changeBackGroundColor } from "./Utils.js";
import { UserContext } from "../../App.js";
import ArtistInfo from "./ArtistInfo.js";
import { BaseUrl } from "../../App.js";
import SearchError from "./SearchError";

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
    handleCloseErrorBackDrop,
  } = props;

  async function saveSong(Args) {
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
        await fetch(`${BaseUrl}/song`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`,
          },
          body: JSON.stringify({
            song_key: Args[0],
            artist_name: Args[1],
            artist_image: Args[2],
        
          }),
        })
      ).json();
      changeBackGroundColor(state.key, "#ffffff");
      if (!result.error) {
        setState({
          data: state,
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

      changeBackGroundColor(state.key, "#ffffff");
      changeBackGroundColor(Args[0], "#f2f3f6");
    } else {
      console.log("message", result.error);
    }
  }



  return (
    <React.Fragment>
      
            <div className="search-results-container">
              {results.data.songs[0].DummyData ? (
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
                results.data.songs.map((result) => {
                  return (
                    <div
                      className="card mb-3 search-result-grid-card"
                      key={result.id}
                      id={`search-result-item-${result.id}`}
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
                            <h5
                              className="card-title"
                              style={{ fontFamily: "Oswald, sans-serif" }}
                            >
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
                            onClick={saveSong.bind(this, [
                              result.id,
                              result.artist.name,
                              result.artist.picture_xl,
                             
                            ])}
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
  );
}

export default SearchResult;
