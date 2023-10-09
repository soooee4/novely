const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "sooo",
  password: "1234",
});

module.exports = pool;
