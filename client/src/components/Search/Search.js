import React, { useState } from "react";
import initialState from "./DummyData.js";
import SearchForm from "./SearchForm.js";
import SearchResult from "./SearchResult.js";
import { BaseUrl } from "../../App.js";

function Search() {
  const [state, setState] = useState({ ...initialState });
  const handleResultsCloseButton = () => {
    setState({ ...initialState });
    document.getElementById("search-results-model").style.display = "none";
  };

  const toggleArtistInfoModal = () => {
    document.getElementById("artist-info").classList.toggle("visible");
  };

  const toggleArtistInfoModalBackDrop = () => {
    document.getElementById("backdrop").classList.toggle("visible");
  };

  const hanldeAristInfoButtonAndBackDrop = () => {
    toggleArtistInfoModalBackDrop();
    toggleArtistInfoModal();
  };
  const handleShowArtistInfoButton = () => {
    if (document.getElementById("search-result-audio-player") !== null)
      document.getElementById("search-result-audio-player").pause();
    hanldeAristInfoButtonAndBackDrop();
  };

  const handleHideArtistInfoButton = () => {
    if (document.getElementById("search-result-audio-player") !== null)
      document.getElementById("search-result-audio-player").play();
    hanldeAristInfoButtonAndBackDrop();
  };

  const handleSearch = (text) => {
    (async function fetchData() {
      await fetch(`${BaseUrl}/search`, {
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
        handleShowArtistInfoButton={handleShowArtistInfoButton}
        handleHideArtistInfoButton={handleHideArtistInfoButton}
      />
    </React.Fragment>
  );
}

export default React.memo(Search);
