const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "0509",
  host: "localhost",
  port: 5432,
  database: "db",
});
module.exports = pool;
