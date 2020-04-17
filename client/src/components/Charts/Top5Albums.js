import React from "react";
import "./Top5Albums.css";

function Top5Albums(props) {
  const { albums, isloaded } = props;
  return (
    <div className="top-5-albums-container">
      {isloaded === false || albums === undefined
        ? null
        : albums.map((album) => {
            return (
              <div className="card mb-3" key={album.id} id="boxChart">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <div className="top-5-albums-image-container">
                      <img
                        src={album.cover}
                        className="img-thumbnail"
                        alt="..."
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body" id="top-5-albums-fonts">
                      <h5 className="card-title">
                        <big>
                          <strong>{album.title}</strong>
                        </big>
                      </h5>
                      <p className="card-text">Artist: {album.artist.name}</p>
                      <p className="card-text">
                        Top 5 position: {album.position}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Explicit Lyrics:{" "}
                          {album.explicit_lyrics === true ? "Yes" : "No"}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            );
          })}
    </div>
  );
}
export default Top5Albums;
