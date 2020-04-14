import React, { useContext, useState, useEffect } from "react";
import "./SearchResult.css";
import { UserContext } from "../../App.js";
import AudioPlayer from "react-h5-audio-player";

function SearchResult(props) {
  const [user] = useContext(UserContext);
  const [state, setState] = useState({
    key: 0,
    message: "",
    displayAudioButton: "show-music-button",
    displayVideoButton: "show-video-button",
  });
  const { results, handleClose } = props;

  async function saveSong(Args) {
    if (!user.accesstoken) return console.log("You need to login to Save.");
    else {
      const result = await (
        await fetch("http://localhost:4020/search/saveSong", {
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
          key: result.key,
          message: result.message,
          displayVideoButton: "show-video-button",
          displayAudioButton: "show-music-button",
        });
      } else {
        setState({ message: result.error });
      }
    }
  }

  async function musicVideoButton(Args) {
    const result = await (
      await fetch("http://localhost:4020/buttonUI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_key: Args[0],
          music_video_button_click: Args[1],
        }),
      })
    ).json();

    if (!result.error) {
      setState({
        ...state,
        key: result.key,
        musicVideoButtonClicked: result.musicVideoButtonClicked,
        displayAudioButton: "show-music-button",
        displayVideoButton: "show-video-button",
      });
    } else {
      console.log("message", result.error);
    }
  }

  async function musicAudioButton(Args) {
    const result = await (
      await fetch("http://localhost:4020/buttonUI", {
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
      console.log(result.musicAudioButtonClicked);
      setState({
        ...state,
        key: result.key,
        musicAudioButtonClicked: result.musicAudioButtonClicked,
        displayAudioButton: "show-music-button",
        displayVideoButton: "show-video-button",
      });
    } else {
      console.log("message", result.error);
    }
  }

  useEffect(() => {
    if (state.message !== "") {
      setTimeout(() => {
        setState({ key: 0, message: "" });
      }, 3000);
    }
  }, [state]);

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
            {results[0].DummyData ? (
              <div className="">
                <div
                  className="spinner-grow text-dark"
                  role="status"
                  style={{ margin: "0 auto" }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              results.map((result) => {
                return (
                  <div
                    className="card mb-3 search-result-grid-card"
                    key={result.id}
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
                        {result.id === state.key &&
                        state.musicAudioButtonClicked === true ? (
                          <div className="top-4-tracks-audio-player">
                            <AudioPlayer
                              src={result.preview}
                              volume="0.5"
                              controls
                            />
                          </div>
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
                              <i className="fab fa-google-play" />
                            </button>
                          </div>
                        )}
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
                            <button
                              className="btn btn-primary"
                              onClick={saveSong.bind(this, [
                                result.id,
                                result.artist.name,
                                result.artist.picture_xl,
                                result.title,
                                result.album.title,
                                result.explicit_lyrics,
                                result.preview,
                              ])}
                            >
                              save
                            </button>
                            {result.id === state.key ? state.message : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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
