import React, { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/27`
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  }, []);
  return <p>Header</p>;
}
export default Header;
/*
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      data2: [],
      data3: [],
      data4: []
    };
  }

  async componentDidMount() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/27`;
    await Axios.get(url).then(response => {
      this.setState({
        isLoaded: true,
        data: response.data
      });
    });
    const url2 = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/29`;
    await Axios.get(url2).then(response => {
      this.setState({
        isLoaded: true,
        data2: response.data
      });
    });
    const url3 = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/30`;
    await Axios.get(url3).then(response => {
      this.setState({
        isLoaded: true,
        data3: response.data
      });
    });
  }

  render() {
    const { data, data2, data3 } = this.state;
    return (
      <React.Fragment>
        <div className="flex-containerHeader">
          <div className="Header1">
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              <img
                src={data.picture_medium}
                className="img-thumbnail"
                alt=""
                id="box"
              />
            </a>
          </div>
          <div className="Header2">
            <a href={data2.link} target="_blank" rel="noopener noreferrer">
              <img
                src={data2.picture_medium}
                className="img-thumbnail"
                alt=""
                id="box"
              />
            </a>
          </div>
          <div className="Header3">
            <a href={data3.link} target="_blank" rel="noopener noreferrer">
              <img
                src={data3.picture_medium}
                className="img-thumbnail"
                alt=""
                id="box"
              />
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
*/
