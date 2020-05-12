const nodemailer = require("nodemailer");
const Model = require("../../../models/MusicModel/Utils/Utils.js");

exports.sendEmail = async (options) => {
  const transpoter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 25,
    auth: {
      user: "f7b4cabd429e71",
      pass: "91a103f2401cff",
    },
  });
  //4516bc3198-1b080c@inbox.mailtrap.io
  const mailOptions = {
    from: "Edwin's Support Team <eushibantusupprt@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transpoter.sendMail(mailOptions);
};

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
    res.redirect("http://18.222.115.53:4020/login");
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
