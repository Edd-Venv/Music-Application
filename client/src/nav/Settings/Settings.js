import React, { useContext } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";
import ChangeUserName from "./ChangeUserName.js";
import ChangeUserPwd from "./ChangeUserPwd.js";

function Settings(props) {
  const [user] = useContext(UserContext);

  const deleteUser = async () => {
    const result = await (
      await fetch(`${BaseUrl}/deleteUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`,
        },
      })
    ).json();

    if (!result.error) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }

    props.logOutCallback();
  };

  return (
    <React.Fragment>
      <Navigation logOutCallback={props.logOutCallback} />
      <ChangeUserName logOutCallback={props.logOutCallback} />
      <ChangeUserPwd logOutCallback={props.logOutCallback} />
      <h3 style={{ color: "white" }}>DELETE PROFILE</h3>
      <button className="btn btn-danger" onClick={deleteUser}>
        DELETE USER
        <svg
          className="bi bi-trash-fill"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </React.Fragment>
  );
}

export default Settings;
