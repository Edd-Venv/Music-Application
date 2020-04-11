import React, { useEffect, useState, useContext } from "react";
import Navigation from "../../nav/Navigation/Navigation.js";
import AudioPlayer from "react-h5-audio-player";
import { UserContext } from "../../App.js";
import "./MySongs.css";
import OneSong from "./OneSong.js";

const MySongs = (props) => {
  const [user] = useContext(UserContext);
  const [content, setContent] = useState([]);

  async function fetchSongs() {
    const result = await (
      await fetch("http://localhost:4020/MySongs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`,
        },
      })
    ).json();

    if (result.data) setContent([result.data]);
  }

  useEffect(() => {
    fetchSongs();
  }, [user]);

  async function deleteSong(Args) {
    try {
      if (user.accesstoken)
        await fetch("http://localhost:4020/MySongs/Delete", {
          method: "POST",
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

  return (
    <React.Fragment>
      <Navigation logOutCallback={props.logOutCallback} />
      <br />
      {!user.accesstoken ? (
        <h2 style={{ textAlign: "center", fontWeight: "bold", color: "white" }}>
          You need to login.
        </h2>
      ) : user.accesstoken && content[0] === undefined ? (
        <div
          className="spinner-grow text-dark"
          role="status"
          style={{ margin: "auto" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : user.accesstoken && content[0].length === 0 ? (
        <h2 style={{ textAlign: "center", fontWeight: "bold", color: "white" }}>
          You Don't Have Songs Saved.
        </h2>
      ) : user.accesstoken && content[0].length <= 2 ? (
        <OneSong deleteSong={deleteSong} content={content} />
      ) : (
        <div className="my-songs-container">
          {content[0].map((info) => {
            return (
              <div
                className="card mb-3"
                style={{ width: "85%" }}
                id="my-songs-item"
                key={info.song_key}
              >
                <div className="row no-gutters">
                  <div style={{ width: "30%", marginLeft: "3.2%" }}>
                    <img
                      alt="loading"
                      src={info.artist_image}
                      className="img-thumbnail"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-md-4" style={{ width: "30%" }}>
                    <AudioPlayer
                      volume="0.5"
                      layout="stacked"
                      src={info.song}
                      control="false"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body" style={{ marginLeft: "2%" }}>
                      <h5 className="card-title">
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
                        <button
                          className="btn btn-danger"
                          onClick={deleteSong.bind(this, [
                            info.song_title,
                            info.song_key,
                          ])}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default MySongs;
