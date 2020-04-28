const pool = require("../../database-connection/db.js");
const { isAuth } = require("../../src/isAuth.js");
const express = require("express");
const router = express.Router();

///SAVE SONG FUNCTION
async function saveSong(req, res, next) {
  const userId = isAuth(req);
  if (userId !== null) {
    try {
      //Check If Book is Already Saved
      const checkDB = await pool.query(
        `SELECT * FROM music WHERE song_key = '${req.body.song_key}'
               AND person_id = '${userId}'`
      );

      const doesSongExist = checkDB.rows[0];

      if (doesSongExist !== undefined)
        throw new Error(`" ${req.body.song_title} " is Already Saved.`);

      const values = [
        userId,
        req.body.song_key,
        req.body.artist_image,
        req.body.artist_name,
        req.body.song_title,
        req.body.album_title,
        req.body.explicit_lyrics,
        req.body.song,
      ];

      pool.query(
        `INSERT INTO music (person_id, song_key, artist_image, artist_name,
            song_title, album_title, explicit_lyrics, song
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)`,
        values,
        (q_err, q_res) => {
          if (q_err) return next(q_err);
          res.json({ key: req.body.song_key, message: "Song Saved" });
        }
      );
    } catch (err) {
      res.json({ key: req.body.song_key, message: err.message });
    }
  }
}

router.post("/search/saveSong", async (req, res, next) => {
  saveSong(req, res, next);
});

router.post("/saveSong", async (req, res, next) => {
  saveSong(req, res, next);
});

///FETCHING SAVED SONGS
router.get("/MySongs", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const songs = await pool.query(
        `SELECT * FROM music WHERE person_id = '${userId}'`
      );
      res.send({
        data: songs.rows,
      });
    }
  } catch (err) {
    res.redirect("http://18.222.115.53:4020/login");
  }
});

//DELETING SAVED SONGS
router.post("/MySongs/Delete", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(
        `DELETE FROM music WHERE song_key = '${req.body.song_key}'
             AND person_id = '${userId}'`
      );

      res.json({ message: `${req.body.movie_title} Deleted.` });
    }
  } catch (error) {
    res.json({ error: "Movie Not Deleted." });
  }
});

/// SENDING SELETED BUTTON KEY
router.post("/buttonUI", async (req, res) => {
  try {
    res.json({
      key: req.body.song_key,
      musicAudioButtonClicked: req.body.music_audio_button_click,
    });
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
