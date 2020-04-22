import React, { useState, useEffect, useContext } from "react";
import HeaderCard from "./HeaderCard.js";
import { DummyData } from "./DummyData.js";
import { UserContext, BaseUrl } from "../../App.js";
import "./Header.css";

function Header() {
  const [user] = useContext(UserContext);
  const [state, setState] = useState({
    isLoaded: false,
  });

  const [cardContent, setCardContent] = useState({
    ...DummyData,
    isLoaded: false,
    key: 0,
    message: "Save",
    displayAudioButton: "show-music-button",
  });

  let timeOut;

  async function saveSong(...Args) {
    if (!user.accesstoken)
      setCardContent({
        ...cardContent,
        message: "You need to login to Save.",
        musicAudioButtonClicked: false,
        displayAudioButton: "show-music-button",
      });
    else {
      const result = await (
        await fetch(`${BaseUrl}/saveSong`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`,
          },
          body: JSON.stringify({
            song_key: Args[0],
            artist_name: Args[1],
            artist_image: Args[2],
            song_title: Args[3],
            album_title: Args[4],
            explicit_lyrics: Args[5],
            song: Args[6],
          }),
        })
      ).json();

      if (!result.error) {
        setCardContent({
          ...cardContent,
          key: result.key,
          message: result.message,
          musicAudioButtonClicked: false,
          displayAudioButton: "show-music-button",
        });
      } else {
        setCardContent({ message: result.error });
      }
    }
  }

  async function musicAudioButton(Args) {
    const result = await (
      await fetch(`${BaseUrl}/buttonUI`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_key: Args[0],
          music_audio_button_click: Args[1],
        }),
      })
    ).json();

    if (!result.error) {
      setCardContent({
        ...cardContent,
        key: result.key,
        message: "Save",
        musicAudioButtonClicked: result.musicAudioButtonClicked,
        displayAudioButton: "show-music-button",
      });
      if (timeOut) {
        clearTimeout(timeOut);
      }
    } else {
      console.log("message", result.error);
    }
  }

  useEffect(() => {
    if (cardContent.message !== "Save") {
      timeOut = setTimeout(() => {
        setCardContent({ ...cardContent, message: "Save" });
      }, 3000);
    }
  }, [cardContent.message]);

  const showHeaderCard = (data) => {
    if (document.getElementById("header-card") !== null) {
      setCardContent({ ...data, message: "Save" });
      document.getElementById("header-card").style.display = "block";
    }
  };
  const handleClose = () => {
    setCardContent({ ...DummyData, message: "Save" });
    document.getElementById("header-card").style.display = "none";
  };

  useEffect(() => {
    fetch(`${BaseUrl}/ChartData`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setState({
          isLoaded: true,
          data: result.ChartData.tracks.slice(5, 8),
        });
      });
  }, []);

  return (
    <React.Fragment>
      {state.isLoaded === false ? null : (
        <div className="flex-containerHeader">
          <div className="Header1">
            <button
              id="header-button"
              onClick={showHeaderCard.bind(this, state.data[0])}
            >
              <img
                src={state.data[0].artist.picture_xl}
                className="img-thumbnail"
                alt="Artist"
                id="box"
              />
            </button>
          </div>
          <div className="Header2">
            <button
              id="header-button"
              onClick={showHeaderCard.bind(this, state.data[1])}
            >
              <img
                src={state.data[1].artist.picture_xl}
                className="img-thumbnail"
                alt="Artist"
                id="box"
              />
            </button>
          </div>
          <div className="Header3">
            <button
              id="header-button"
              onClick={showHeaderCard.bind(this, state.data[2])}
            >
              <img
                src={state.data[2].artist.picture_xl}
                className="img-thumbnail"
                alt="Artist"
                id="box"
              />
            </button>
          </div>
        </div>
      )}
      <HeaderCard
        state={cardContent}
        handleClose={handleClose}
        saveSong={saveSong}
        musicAudioButton={musicAudioButton}
      />
    </React.Fragment>
  );
}
export default React.memo(Header);
