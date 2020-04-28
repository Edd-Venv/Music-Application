export const changeBackGroundColor = (key, color) => {
  if (document.getElementById("my-songs-item-" + key)) {
    const mySongsItem = document.getElementById("my-songs-item-" + key);
    mySongsItem.style.backgroundColor = color;
  }
};
