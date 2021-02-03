const Pool = require("pg").Pool;

const pool = new Pool ({
  user: "postgres",
  password: "230995",
  database: "pernweb",
  host: "localhost",
  port: 5432
})

module.exports = pool;