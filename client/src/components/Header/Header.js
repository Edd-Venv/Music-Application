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
    data: DummyData,
    isLoaded: false,
    key: 0,
    message: "Save",
    displayAudioButton: "show-music-button",
  });

  let timeOut;

  async function saveSong(Args) {
    if (!user.accesstoken)
      setCardContent({
        data: cardContent.data,
        key: cardContent.key,
        musicAudioButtonClicked: cardContent.musicAudioButtonClicked,
        message: "You need to login to Save.",
      });
    else {
      const result = await (
        await fetch(`${BaseUrl}/song`, {
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
          data: cardContent.data,
          musicAudioButtonClicked: cardContent.musicAudioButtonClicked,
          key: result.key,
          message: result.message,
        });
      } else {
        setCardContent({ message: result.error });
      }
    }
  }

  const handleAudioPlayer = (Args) => {
    if (!document.getElementById("header-card-audio-tag-" + Args[0])) {
      const audioPlayer = document.createElement("audio");
      audioPlayer.id = "header-card-audio-tag-" + Args[0];
      audioPlayer.className = "header-card-audio-player";

      const headerCard = document.getElementById(`header-card-${Args[0]}`);
      headerCard.style.borderBottomLeftRadius = 31.5 + "px";
      headerCard.style.borderBottomRightRadius = 31.5 + "px";
      headerCard.style.borderTopRightRadius = 31.5 + "px";
      headerCard.style.backgroundColor = "#F2F3F6";
      const headerCardImg = document.getElementById(
        `header-card-img-${Args[0]}`
      );

      headerCardImg.style.borderTopRightRadius = 31.5 + "px";

      if (document.getElementById("header-card-div-" + Args[0])) {
        const hostElement = document.getElementById(
          "header-card-div-" + Args[0]
        );
        hostElement.appendChild(audioPlayer);

        audioPlayer.style.position = "absolute";
        audioPlayer.style.left = 0 + "px";
        audioPlayer.style.top = 36 + "px";
        audioPlayer.src = Args[2];
        audioPlayer.volume = "0.5";
        audioPlayer.controls = true;
      }
    }
    setCardContent({
      data: cardContent.data,
      key: Args[0],
      message: "Save",
      musicAudioButtonClicked: Args[1],
    });
    if (timeOut) {
      clearTimeout(timeOut);
    }
  };

  useEffect(() => {
    if (cardContent.message !== "Save") {
      timeOut = setTimeout(() => {
        setCardContent({
          data: cardContent.data,
          message: "Save",
          key: cardContent.key,
          musicAudioButtonClicked: cardContent.musicAudioButtonClicked,
        });
      }, 3000);
    }
  }, [cardContent.message]);

  const showHeaderCard = (data) => {
    if (document.getElementById("header-card") !== null) {
      setCardContent({
        data: data,
        message: "Save",
        displayAudioButton: "show-music-button",
      });
      document.getElementById("header-card").style.display = "block";

      const audios = document.getElementsByTagName("audio");
      for (let i = 0; i < audios.length; i++) {
        audios[i].pause();
      }
    }
  };
  const handleClose = () => {
    setCardContent({ data: DummyData, message: "Save" });
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
  //console.log(cardContent);
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
        handleAudioPlayer={handleAudioPlayer}
      />
    </React.Fragment>
  );
}
export default React.memo(Header);
