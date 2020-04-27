const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();
const express = require("express");
const router = express.Router();

/////Fetching Header Data/ Charts
router.get("/ChartData", async (req, res) => {
  const chartsApi = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0`;

  try {
    const exists = Cache.has("ApiData");

    if (exists) {
      res.json({ ...Cache.get("ApiData") });
    } else {
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

      Cache.set("ApiData", { ...finalResult }, 691200);
      res.json({ ...finalResult });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
