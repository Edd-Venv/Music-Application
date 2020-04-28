export const changeBackGroundColor = (key, color) => {
  if (document.getElementById("search-result-item-" + key)) {
    const searchResultItem = document.getElementById(
      "search-result-item-" + key
    );
    searchResultItem.style.backgroundColor = color;
  }
};
