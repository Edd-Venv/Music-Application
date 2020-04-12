import React, { useState } from "react";
import initialState from "./DummyData.js";
import SearchForm from "./SearchForm.js";
import SearchResult from "./SearchResult.js";

function Search() {
  const [state, setState] = useState(initialState);
  const handleClose = () => {
    setState({ ...initialState });
    document.getElementById("search-results-model").style.display = "none";
  };

  const onAddSearch = (text) => {
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
          setState({ data: Data.data[0].data.slice(0, 6) });
        });
    })();
  };

  return (
    <React.Fragment>
      <SearchForm onAddSearch={onAddSearch} />
      <SearchResult results={state.data} handleClose={handleClose} />
    </React.Fragment>
  );
}

export default Search;
