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
          setState({ data: Data.data[0].data.slice(0, 9) });
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

/*
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      search: [],
      Details: [],
      value: "",
      display: "hide",
      displayAudioPlayer: "hide",
      buttonDisplay: "show",
      stopAudio: "0.5",
      Video: [],
      Test: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${this.state.value}`;
    Axios.get(url).then(response => {
      this.setState({
        isLoaded: true,
        search: response.data.data[0],
        value: "",
        display: "show",
        stopAudio: "0.5"
      });
    });
    const apiKey = "341314-MusicApp-1I2LKOB1";
    const urlVideo = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${this.state.value}&type=music&info=1&verbose=1&k=${apiKey}`;
    Axios.get(urlVideo).then(responseVid => {
      this.setState({
        Video: responseVid.data.Similar.Info[0].yUrl,
        Test: responseVid.data.Similar.Info[0].Type
      });
    });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleClick = event => {
    this.setState({
      display: "hide",
      displayAudioPlayer: "hide",
      buttonDisplay: "hide",
      search: "",
      isLoaded: false
    });
  };
  handleButtonClick = event => {
    this.setState({
      displayAudioPlayer: "show",
      buttonDisplay: "hide"
    });
  };

  render() {
    const {
      search,
      isLoaded,
      display,
      stopAudio,
      Test,
      Video,
      buttonDisplay,
      displayAudioPlayer
    } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} style={{ marginLeft: "36%" }}>
          <span className="form-inline">
            <input
              className="form-control"
              type="text/number"
              onChange={this.handleChange}
              value={this.state.value}
              placeholder="Artist Name"
              id="input"
            />
            <button className="btn btn-dark" type="submit">
              <i className="fas fa-search" />
            </button>
          </span>
        </form>
        {isLoaded === false ? null : (
          <SearchResult
            search={search}
            display={display}
            stopAudio={stopAudio}
            Test={Test}
            Video={Video}
            buttonDisplay={buttonDisplay}
            displayAudioPlayer={displayAudioPlayer}
            handleClick={this.handleClick}
            handleButtonClick={this.handleButtonClick}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Search;
*/
