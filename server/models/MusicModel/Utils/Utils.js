/* eslint-disable camelcase */
const pool = require("../../../database-connection/db.js");
const { isAuth } = require("../../../src/isAuth.js");

///SAVE SONG FUNCTION
exports.saveSongModel = async (req, next) => {
  const userId = isAuth(req);
  if (userId !== null) {
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

      (q_err) => {
        if (q_err) return next(q_err);
      }
    );
  }
};

exports.getMySongsModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    const songs = await pool.query(
      `SELECT * FROM music WHERE person_id = '${userId}'`
    );

    const artists = songs.rows
      .map((song) => {
        return song.artist_name;
      })
      .sort();

    const sortedSongs = [];
    const sortedArtistNames = [];

    for (let i = 0; i < artists.length; i++) {
      if (artists[i] !== artists[i + 1]) {
        sortedArtistNames.push(artists[i]);
      }
    }

    sortedArtistNames.forEach((artistName) => {
      sortedSongs.push(
        ...songs.rows.filter((song) => {
          if (song.artist_name.toLowerCase() === artistName.toLowerCase())
            return song;
        })
      );
    });

    return sortedSongs;
  }
};

exports.deleteSongModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    await pool.query(
      `DELETE FROM music WHERE song_key = '${req.body.song_key}'
                 AND person_id = '${userId}'`
    );
  }
};
