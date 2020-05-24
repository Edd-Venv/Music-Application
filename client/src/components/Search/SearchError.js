import React from "react";
import PropTypes from "prop-types";
import "./SearchResult.css";

const SearchError = (props) => {
  setTimeout(() => {
    props.handleCloseErrorBackDrop();
  }, 4000);

  return (
    <React.Fragment>
      <p className="error-paragraph">
        Sorry Artist Not Found
        <i
          style={{ color: "red", cursor: "pointer" }}
          onClick={props.handleCloseErrorBackDrop}
        >
          ×
        </i>
      </p>
    </React.Fragment>
  );
};
SearchError.propTypes = {
  handleCloseErrorBackDrop: PropTypes.func.isRequired,
};
export default SearchError;
