const pool = require("../../database-connection/db.js");
const { hash, compare } = require("bcryptjs");
const { verify } = require("jsonwebtoken");
const uuid_generate = require("uuid");
const express = require("express");
const router = express.Router();
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../../src/tokens.js");

// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Get a new accesstoken with a refresh token

// 1. Register a user
router.post("/register", async (req, res) => {
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
router.post("/login", async (req, res) => {
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
router.post("/logout", async (_req, res) => {
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
router.post("/refresh_token", async (req, res) => {
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

module.exports = router;
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
