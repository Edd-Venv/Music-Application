import React from "react";
import "./SearchResult.css";

const ArtistInfo = (props) => {
  const { results, handleHideArtistInfoButton } = props;
  return (
    <React.Fragment>
      <div id="backdrop" onClick={handleHideArtistInfoButton}></div>
      <div
        className="search-results-artist-info-model"
        id="artist-info"
        key={results.video[0].yID}
      >
        <div className="card mb-3 artist-info-container">
          <div className="card-text">
            {results.video[0].wTeaser.substring(0, 500)}
          </div>
          <button
            onClick={handleHideArtistInfoButton}
            className="close-artist-info-button btn btn-dark"
          >
            Close
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ArtistInfo;
