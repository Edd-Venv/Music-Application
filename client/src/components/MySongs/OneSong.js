import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "./MySongs.js";

const OneSong = (props) => {
  const { content, deleteSong } = props;

  return (
    <div className="my-songs-container">
      {content[0].map((info) => {
        return (
          <div
            className="card mb-3"
            style={{ width: "60%" }}
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
  );
};
export default OneSong;
