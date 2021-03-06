import React, { useContext, useState } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import "./Settings.css";

function ChangeUserPwd(props) {
  const [user] = useContext(UserContext);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await (
      await fetch(`${BaseUrl}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`,
        },
        body: JSON.stringify({
          old_password: oldPwd,
          new_password: newPwd,
        }),
      })
    ).json();
    if (!result.error) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }

    props.logOutCallback();
  };

  const handleInput = (event) => {
    if (event.target.name === "old password") {
      setOldPwd(event.target.value);
    } else setNewPwd(event.target.value);
  };
  return (
    <form className="card mb-3 form" onSubmit={handleSubmit}>
      <div className="form-group">
        <h4
          style={{
            fontFamily: "Oswald, sans-serif",
            textAlign: "center",
            color: "white",
          }}
        >
          CHANGE PASSWORD
        </h4>
        <div style={{ display: "flex", color: "white" }}>
          <label htmlFor="old password">OLD PASSWORD</label>
          <input
            className="settings-input form-control"
            value={oldPwd}
            placeholder="******"
            type="password"
            onChange={handleInput}
            name="old password"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <div style={{ display: "flex", color: "white" }}>
          <label htmlFor="new password">NEW PASSWORD</label>
          <input
            className="settings-input form-control"
            name="new password"
            value={newPwd}
            placeholder="******"
            type="password"
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SUBMIT
        </button>
      </div>
    </form>
  );
}

export default ChangeUserPwd;
