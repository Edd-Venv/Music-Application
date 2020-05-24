const fetch = require("node-fetch");

exports.searchModel = async (req) => {
  const api = `https://api.deezer.com/search?q=${req.body.search_text}`;
  const videoApi = `https://tastedive.com/api/similar?q=${req.body.search_text}&type=music&info=1&verbose=`;
  const apiResult = await (await fetch(api)).json();
  const videoApiResult = await (await fetch(videoApi)).json();

  const songs = apiResult.data.slice(0, 6);
  const video = videoApiResult.Similar.Info;
  const finalResult = { songs, video };

  return finalResult;
};
