import React, { useContext, useState, useEffect } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import { GoPerson } from "react-icons/go";

const UserLogo = (props) => {
  const [user] = useContext(UserContext);
  const [name, setName] = useState("GUEST");

  async function getName() {
    if (user.accesstoken) {
      try {
        const result = await (
          await fetch(`${BaseUrl}/userName`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user.accesstoken}`,
            },
          })
        ).json();

        setName(result.name);
      } catch (error) {
        console.log(error);
      }
    } else return setName("GUEST");
  }

  useEffect(() => {
    getName();
  }, [user.accesstoken]);

  return (
    <span>
      <i
        style={{
          fontSize: "1.5rem",
          color: "black",
          fontWeight: "bold",
          paddingLeft: "0.5rem",
        }}
      >
        <GoPerson />
        {name}
      </i>
    </span>
  );
};
export default React.memo(UserLogo);
