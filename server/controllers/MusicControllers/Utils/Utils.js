const Model = require("../../../models/MusicModel/Utils/Utils.js");

exports.saveSong = async (req, res, next) => {
  try {
    await Model.saveSongModel(req, next);
    res.status(200).json({ key: req.body.song_key, message: "Song Saved" });
  } catch (error) {
    res.status(404).json({ key: req.body.song_key, message: error.message });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    await Model.deleteSongModel(req);
    res.status(202).json({ message: `${req.body.movie_title} Deleted.` });
  } catch (error) {
    res.status(404).json({ error: "Movie Not Deleted." });
  }
};

exports.getMySongs = async (req, res) => {
  try {
    const songs = await Model.getMySongsModel(req);
    res.status(200).json({
      data: songs,
    });
  } catch (error) {
    const url = `${req.protocol}://${req.get("host")}/login`;
    res.redirect(url);
  }
};

exports.handleButtonUI = async (req, res) => {
  try {
    res.status(200).json({
      key: req.body.song_key,
      musicAudioButtonClicked: req.body.music_audio_button_click,
    });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
