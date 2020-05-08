const NodeCache = require("node-cache");
const fetch = require("node-fetch");

/////Fetching Header Data/ Charts
exports.getChartDataModel = async () => {
  const chartsApi = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0`;

  const charts = await (
    await fetch(chartsApi, {
      headers: { origin: "https://cors-anywhere.herokuapp.com/" },
    })
  ).json();

  const finalResult = {
    ChartData: {
      tracks: charts.tracks.data.slice(0, 8),
      albums: charts.albums.data.slice(0, 6),
      artists: charts.artists.data.slice(0, 7),
    },
  };
  return finalResult;
};
