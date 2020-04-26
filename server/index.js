require("dotenv/config");
const express = require("express");
const fetch = require("node-fetch");
const uuid_generate = require("uuid");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pool = require("./database-connection/db.js");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { isAuth } = require("./src/isAuth.js");
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("./src/tokens.js");

const NodeCache = require("node-cache");
const Cache = new NodeCache();

const server = express();

// Use express middleware for easier cookie handling
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Needed to be able to read body data
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

////////////////////////////////////////////////////////////////////////////

// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Get a new accesstoken with a refresh token

// 1. Register a user
server.post("/register", async (req, res) => {
  const { person_name, password } = req.body;

  try {
    // 1. Check if the user exist
    const checkDB = await pool.query(
      `SELECT person_name FROM person WHERE person_name = '${person_name}'`
    );
    const doesUserExist = checkDB.rows[0];

    if (doesUserExist !== undefined)
      throw new Error(`USER NAME " ${person_name} " IS TAKEN.`);

    // 2. If not user exist already, hash the password
    const hashedPassword = await hash(password, 10);

    // 3. Insert the user in database
    await pool.query(
      "INSERT INTO person (id_uid, person_name, password) VALUES($1, $2, $3)",
      [uuid_generate.v4(), person_name, hashedPassword]
    );
    res.send({ message: "User Created" });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 2. Login a user
server.post("/login", async (req, res) => {
  const { person_name, password } = req.body;

  try {
    // 1. Check if the user exists
    const checkDB = await pool.query(
      `SELECT * from person where person_name = '${person_name}'`
    );
    const doesUserExist = checkDB.rows[0];

    if (!doesUserExist)
      throw new Error(`" ${person_name} " IS AN INVALID USER.`);

    // 2. Compare crypted password and see if it checks out. Send error if not
    const user = doesUserExist;

    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Password not correct");

    // 3. Create Refresh- and Accesstoken
    const accesstoken = createAccessToken(user.id_uid);
    const refreshtoken = createRefreshToken(user.id_uid);

    // 4. Store Refreshtoken with user in db
    await pool.query(
      `UPDATE person SET refreshtoken = '${refreshtoken}'
         WHERE id_uid = '${user.id_uid}'`
    );

    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 3. Logout a user
server.post("/logout", async (_req, res) => {
  res.clearCookie("refreshtoken", { path: "/refresh_token" });

  // Logic here for to also remove refreshtoken from dataBase
  const { person_name } = _req.body;
  await pool.query(
    `UPDATE person SET refreshtoken = '' WHERE person_name = '${person_name}'`
  );

  return res.send({
    message: "Logged out",
  });
});

// 4. Get a new access token with a refresh token
server.post("/refresh_token", async (req, res) => {
  const token = req.cookies.refreshtoken;

  // If we don't have a token in our request ask to relogin I think
  if (!token) return res.send({ accesstoken: "" });
  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = verify(token, "EDWINRULESEVENMORE");
  } catch (err) {
    return res.send({ accesstoken: "" });
  }

  try {
    // token is valid, now check if user exists in dataBase
    const checkDB = await pool.query(
      `SELECT id_uid FROM person WHERE id_uid = '${payload.userId}'`
    );
    const doesUserExist = checkDB.rows[0].id_uid;
    if (!doesUserExist) throw new Error("User Doesn't Exist In DataBase");

    // user exists, check if refreshtoken exist on user in dataBase.
    const checkRefreshToken = await pool.query(
      `SELECT refreshtoken FROM person WHERE id_uid = '${payload.userId}'`
    );

    if (checkRefreshToken.rows[0].refreshtoken !== token)
      throw new Error("Tokens Don't Match");

    // token exist, create new Refresh And Accesstoken
    const id_uid = doesUserExist;
    const accesstoken = createAccessToken(id_uid);
    const refreshtoken = createRefreshToken(id_uid);

    //Update refreshtoken on user in dataBase
    await pool.query(
      `UPDATE person SET refreshtoken = '${refreshtoken}'
         WHERE id_uid = '${id_uid}'`
    );

    //All Checks Out send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
  } catch (err) {
    return res.send(err);
  }
});

//Sending Client's UserName
/*server.get("/userName", async (req, res, next) => {
  const userId = isAuth(req);

  if (userId !== null) {
    try {
      const exists = Cache.has(`${userId}`);

      if (exists) {
        res.json({ name: Cache.get(`${userId}`) });
      } else {
        const user = await pool.query(
          `SELECT person_name FROM person WHERE id_uid = '${userId}'`
        );
        Cache.set(`${userId}`, user.rows[0].person_name, 691200);
        res.send({ name: user.rows[0].person_name });
      }
    } catch (error) {
      res.json({ error: error });
    }
  }
});*/

//////////////////////////////////////////////SETTINGS///////////////////////////////////////////////////

server.post("/settings/changePassword", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const { new_password, old_password } = req.body;

      const checkDB = await pool.query(
        `SELECT * from person where id_uid = '${userId}'`
      );
      const user = checkDB.rows[0];

      const valid = await compare(old_password, user.password);
      if (!valid) throw new Error("Password not correct");

      const hashedPassword = await hash(new_password, 10);
      await pool.query(`UPDATE person SET password = '${hashedPassword}' 
        WHERE id_uid = '${userId}'`);
    }
    res.json({ message: "Password Changed." });
  } catch (error) {
    res.json({ error: "Password Not Changed." });
  }
});

server.post("/settings/changeName", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(
        `UPDATE person SET person_name = '${req.body.new_name}' 
          WHERE id_uid = '${userId}' AND person_name = '${req.body.old_name}'`
      );
    }
    Cache.set(`${userId}`, req.body.new_name, 691200);
    res.json({ message: "User Name Updated" });
  } catch (error) {
    res.json({ error: "User Name Already Taken." });
  }
});

server.post("/deleteUser", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(`DELETE FROM person WHERE id_uid = '${userId}'`);
      await pool.query(`DELETE FROM show WHERE person_id = '${userId}'`);
      await pool.query(`DELETE FROM movie WHERE person_id = '${userId}'`);
      await pool.query(`DELETE FROM book WHERE person_id = '${userId}'`);
      await pool.query(`DELETE FROM music WHERE person_id = '${userId}'`);

      res.json({ message: "User Deleted." });
    }
  } catch (error) {
    res.send({ error: "User Not Deleted." });
  }
});
// Needed to be able to read body data
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

////////////////////////////////////////////////////////////////////////////API CALLS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////Fetching Header Data/ Charts
server.get("/ChartData", async (req, res) => {
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

//SEARCH DATA
server.post("/search", async (req, res) => {
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

////////////////////////////////////////////////////////////////// UTILS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////SAVE SONG FUNCTION
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

server.post("/search/saveSong", async (req, res, next) => {
  saveSong(req, res, next);
});

server.post("/saveSong", async (req, res, next) => {
  saveSong(req, res, next);
});

///FETCHING SAVED SONGS
server.get("/MySongs", async (req, res) => {
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
    res.redirect("http://localhost:4020/login");
  }
});

//DELETING SAVED SONGS
server.post("/MySongs/Delete", async (req, res) => {
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

/// SENDING SELETED BUTTONs KEY
server.post("/buttonUI", async (req, res) => {
  try {
    res.json({
      key: req.body.song_key,
      musicAudioButtonClicked: req.body.music_audio_button_click,
    });
  } catch (error) {
    res.json({ error: error });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
