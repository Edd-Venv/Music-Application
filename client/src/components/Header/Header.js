import React, { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const [state, setState] = useState({
    isLoaded: false,
  });

  useEffect(() => {
    fetch("http://localhost:4020/")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setState({ isLoaded: true, data: result.data });
      });
  }, []);

  return (
    <React.Fragment>
      {state.isLoaded === false ? null : (
        <div className="flex-containerHeader">
          <div className="Header1">
            <img
              src={state.data[0].picture_medium}
              className="img-thumbnail"
              alt=""
              id="box"
            />
          </div>
          <div className="Header2">
            <img
              src={state.data[1].picture_medium}
              className="img-thumbnail"
              alt=""
              id="box"
            />
          </div>
          <div className="Header3">
            <img
              src={state.data[2].picture_medium}
              className="img-thumbnail"
              alt=""
              id="box"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default Header;
