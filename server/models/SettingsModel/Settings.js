/* eslint-disable camelcase */
const { hash, compare } = require("bcryptjs");
const pool = require("../../database-connection/db.js");
const { isAuth } = require("../../src/isAuth.js");

exports.changeUserPasswordModel = async (req) => {
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
};

exports.changeUserNameModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    await pool.query(
      `UPDATE person SET person_name = '${req.body.new_name}' 
                WHERE id_uid = '${userId}' AND person_name = '${req.body.old_name}'`
    );
  }
};

exports.updateUserImageModel = async (req) => {
  const userId = isAuth(req);

  if (userId !== null) {
    await pool.query(
      `UPDATE person SET person_image = '${req.file.filename}' 
                WHERE id_uid = '${userId}'`
    );
  }
};

exports.deleteUserModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    await pool.query(`DELETE FROM person WHERE id_uid = '${userId}'`);
    await pool.query(`DELETE FROM show WHERE person_id = '${userId}'`);
    await pool.query(`DELETE FROM movie WHERE person_id = '${userId}'`);
    await pool.query(`DELETE FROM book WHERE person_id = '${userId}'`);
    await pool.query(`DELETE FROM music WHERE person_id = '${userId}'`);
  }
};
