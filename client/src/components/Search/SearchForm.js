import React, { useState } from "react";
import "./Search.css";

const SearchForm = React.memo((props) => {
  const [currentText, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddSearch(currentText);
    setText("");

    if (
      document.getElementsByClassName("top-5-tracks-audio-player")[0] !==
      undefined
    )
      document.getElementsByClassName("top-5-tracks-audio-player")[0].pause();

    document.getElementById("input-area").blur();
    document.getElementById("search-results-model").style.display = "block";
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="input-container" id="input">
        <button id="search-button" type="submit">
          <i className="fas fa-search" />
        </button>
        <input
          id="input-area"
          onMouseLeave={() => {
            document.getElementById("input-area").blur();
          }}
          onMouseOver={() => {
            document.getElementById("input-area").focus();
          }}
          className="input-style"
          type="text/number"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={currentText}
          placeholder="Artist Name"
          required
        />
      </div>
    </form>
  );
});
export default SearchForm;
