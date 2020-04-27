const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();
const express = require("express");
const router = express.Router();

router.post("/search", async (req, res) => {
  const api = `https://api.deezer.com/search?q=${req.body.search_text}`;
  const videoApi = `https://tastedive.com/api/similar?q=${req.body.search_text}&type=music&info=1&verbose=1&k=341314-MusicApp-1I2LKOB1`;

  try {
    const exists = Cache.has(`${req.body.search_text}`);
    if (exists) {
      res.json({ ...Cache.get(`${req.body.search_text}`) });
    } else {
      const apiResult = await (await fetch(api)).json();
      const videoApiResult = await (await fetch(videoApi)).json();

      const songs = apiResult.data.slice(0, 6);
      const video = videoApiResult.Similar.Info;
      const finalResult = { songs, video };

      Cache.set(`${req.body.search_text}`, { ...finalResult }, 691200);
      res.json({ ...finalResult });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
