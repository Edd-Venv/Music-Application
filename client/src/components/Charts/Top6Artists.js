import React from "react";
import "./Top6Artists.css";

function Top6Artists(props) {
  const { artists, isloaded } = props;
  return (
    <div className="top-6-artists-container">
      {isloaded === false || artists === undefined
        ? null
        : artists.map((artist) => {
            return (
              <div className="card mb-3" key={artist.id} id="boxChart">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <div className="top-6-artists-image-container">
                      <img
                        src={artist.picture}
                        className="img-thumbnail"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body" id="top-6-artists-fonts">
                      <p className="card-title">
                        <big>
                          <strong>{artist.name}</strong>
                        </big>
                      </p>
                      <p className="card-text">
                        Top 5 postion: {artist.position}
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

export default Top6Artists;
