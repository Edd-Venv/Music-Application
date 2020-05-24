import React, { useEffect, useState, useContext } from "react";
import Navigation from "../../nav/Navigation/Navigation.js";
import { UserContext, BaseUrl } from "../../App.js";
import { changeBackGroundColor } from "./Utils.js";
import "./MySongs.css";

const MySongs = (props) => {
  const [currentFilterText, setFilterText] = useState("");
  const [user] = useContext(UserContext);
  const [content, setContent] = useState({
    displayAudioButton: "show-music-button",
  });

  async function fetchSongs() {
    if (!user.accesstoken) return;
    const result = await (
      await fetch(`${BaseUrl}/MySongs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`,
        },
      })
    ).json();

    if (result.data)
      setContent({
        displayAudioButton: "show-music-button",
        data: result.data,
      });
  }

  useEffect(() => {
    fetchSongs();
  }, [user]);

  async function deleteSong(Args) {
    try {
      if (user.accesstoken)
        await fetch(`${BaseUrl}/song`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`,
          },
          body: JSON.stringify({
            song_title: Args[0],
            song_key: Args[1],
          }),
        });
      fetchSongs();
    } catch (error) {
      console.log(error);
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
      setContent({
        data: content.data,
        key: result.key,
        musicAudioButtonClicked: result.musicAudioButtonClicked,
        displayAudioButton: "show-music-button",
      });
      changeBackGroundColor(content.key, "#ffffff");
      changeBackGroundColor(Args[0], "#f2f3f6");
    } else {
      console.log("message", result.error);
    }
  }

  const filteredSongs = !currentFilterText
    ? content.data
    : content.data.filter((song) =>
        song.artist_name.toLowerCase().includes(currentFilterText.toLowerCase())
      );

  return (
    <React.Fragment>
      <Navigation logOutCallback={props.logOutCallback} />
      <br />

      <div className="input-container" id="input">
        <button id="search-button" type="submit">
          <i className="fas fa-search" />
        </button>
        <input
          id="filter-by-artist-name"
          onMouseLeave={() => {
            document.getElementById("filter-by-artist-name").blur();
          }}
          onMouseOver={() => {
            document.getElementById("filter-by-artist-name").focus();
          }}
          className="input-style"
          type="text/number"
          placeholder="Artist Name"
          onChange={(event) => {
            setFilterText(event.target.value);
          }}
          value={currentFilterText}
        />
      </div>
      <p id="sorted-text">
        <small>Alphabetically Sorted</small>
      </p>
      <div className="my-songs-container">
        {filteredSongs.map((info) => {
          return (
            <div
              className="card mb-3 gird-card-size"
              id={`my-songs-item-${info.song_key}`}
              key={info.song_key}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <div id="my-songs-artist-image">
                    <img
                      alt="loading"
                      src={info.artist_image}
                      className="img-thumbnail"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body" style={{ marginLeft: "2%" }}>
                    <h5
                      className="card-title"
                      style={{ fontFamily: "Oswald, sans-serif" }}
                    >
                      <big>
                        <strong>{info.artist_name}</strong>
                      </big>
                    </h5>
                    <div className="card-text">
                      <p>Song: {info.song_title}</p>
                      <p>Album: {info.album_title}</p>
                      <p>
                        <small className="text-muted">
                          Explicit Lyrics:{" "}
                          {info.explicit_lyrics === true ? "Yes" : "No"}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-songs-buttons-container">
                  <button
                    className="btn btn-danger"
                    onClick={deleteSong.bind(this, [
                      info.song_title,
                      info.song_key,
                    ])}
                  >
                    Delete
                  </button>
                  {info.song_key === content.key &&
                  content.musicAudioButtonClicked === true ? (
                    <div className="top-4-tracks-audio-player">
                      <audio
                        id="my-songs-audio-player"
                        src={info.song}
                        volume="0.5"
                        controls
                      />
                    </div>
                  ) : (
                    <div className={content.displayAudioButton}>
                      <button
                        className="btn btn-dark"
                        type="submit"
                        onClick={musicAudioButton.bind(this, [
                          info.song_key,
                          true,
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
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default MySongs;
