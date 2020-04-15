import React, { useState } from "react";
import initialState from "./DummyData.js";
import SearchForm from "./SearchForm.js";
import SearchResult from "./SearchResult.js";

function Search() {
  const [state, setState] = useState({ ...initialState });
  const handleResultsCloseButton = () => {
    setState({ ...initialState });
    document.getElementById("search-results-model").style.display = "none";
  };

  const handleMusicVideoPlayButton = () => {
    document.getElementById("search-results-music-video-model").style.display =
      "block";
    document.getElementById("search-results-model").style.zIndex = 0;
  };

  const handleMusicVideoCloseButton = () => {
    document.getElementById("search-results-music-video-model").style.display =
      "none";
    document.getElementById("search-results-model").style.zIndex = 1;
  };

  const handleSearch = (text) => {
    (async function fetchData() {
      await fetch("http://localhost:4020/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_text: text,
        }),
      })
        .then((result) => {
          return result.json();
        })
        .then((Data) => {
          setState({ ...Data });
        });
    })();
  };

  return (
    <React.Fragment>
      <SearchForm onAddSearch={handleSearch} />
      <SearchResult
        results={state}
        handleClose={handleResultsCloseButton}
        handleMusicVideoPlayButton={handleMusicVideoPlayButton}
        handleMusicVideoCloseButton={handleMusicVideoCloseButton}
      />
    </React.Fragment>
  );
}

export default Search;
