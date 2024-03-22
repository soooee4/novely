const { Pool } = require("pg");

const pool = new Pool({
  // host: "54.180.116.208",
  // port: 5432,
  // database: "novely",
  // user: "sooo",
  // password: "sooNovely1234!",
  
  // 로컬 테스트용
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "sooo",
  password: "1234",
});

module.exports = pool;