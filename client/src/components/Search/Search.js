import React, { useState } from "react";
import initialState from "./DummyData.js";
import SearchForm from "./SearchForm.js";
import SearchResult from "./SearchResult.js";
import { BaseUrl } from "../../App.js";

function Search() {
  const data = Object.assign({}, initialState);
  const [state, setState] = useState({ data });
  const handleResultsCloseButton = () => {
    setState({ data });
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
    hanldeAristInfoButtonAndBackDrop();
  };

  const handleErrorBackDrop = () => {
    document
      .getElementById("search-error-back-drop")
      .classList.toggle("visible");
  };

  const handleCloseErrorBackDrop = () => {
    setState({
      data,
    });

    if (
      document
        .getElementById("search-error-back-drop")
        .classList.toggle("visible")
    )
      document
        .getElementById("search-error-back-drop")
        .classList.toggle("visible");
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
          if (Data.songs.length === 0) {
            handleErrorBackDrop();
            return setState({ data: { songs: { length: 0 } } });
          }
          document.getElementById("search-results-model").style.display =
            "block";
          setState({ data: Data });
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
        handleCloseErrorBackDrop={handleCloseErrorBackDrop}
      />
    </React.Fragment>
  );
}

export default React.memo(Search);
