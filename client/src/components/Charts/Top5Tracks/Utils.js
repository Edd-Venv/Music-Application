const changeBackGroundColor = (key, color) => {
  if (document.getElementById("top-5-chart-card-" + key)) {
    const top5Card = document.getElementById("top-5-chart-card-" + key);
    top5Card.style.backgroundColor = color;
  }
};

export const top5TracksAudioTag = (key, prevKey, src) => {
  if (!document.getElementById("top-5-tracks-audio-tag-" + key)) {
    const audioPlayer = document.createElement("audio");
    audioPlayer.id = "top-5-tracks-audio-tag-" + key;
    audioPlayer.className = "top-5-tracks-audio-player";

    if (document.getElementById("top-5-tracks-audio-tag-" + prevKey)) {
      document
        .getElementById("top-5-tracks-div-" + prevKey)
        .removeChild(
          document.getElementById("top-5-tracks-audio-tag-" + prevKey)
        );
    }

    changeBackGroundColor(prevKey, "#ffffff");
    changeBackGroundColor(key, "#f2f3f6");

    if (document.getElementById("top-5-tracks-div-" + key)) {
      const hostElement = document.getElementById("top-5-tracks-div-" + key);
      hostElement.appendChild(audioPlayer);

      audioPlayer.style.position = "absolute";
      audioPlayer.style.left = 0 + "px";
      audioPlayer.style.top = -3 + "px";
      audioPlayer.src = src;
      audioPlayer.volume = "0.5";
      audioPlayer.controls = true;
    }
  }
};
