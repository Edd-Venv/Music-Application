import React from "react";
import "./SearchResult.css";

const MusicVideo = (props) => {
  const { results, handleMusicVideoCloseButton } = props;

  return (
    <div id="search-results-music-video-model" key={results.video[0].yID}>
      <div className="music-video-container">
        <p onClick={handleMusicVideoCloseButton} className="close-music-video">
          ×
        </p>

        <iframe
          src={`https://www.youtube.com/watch?v=${results.video[0].yID}`}
          className="img-thumbnail"
          id="search-result-music-video-iframe"
          title={results.video[0].name}
        />
      </div>
    </div>
  );
};
export default MusicVideo;
