const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Amaan612001",
  port: "3306",
  database: "pms",
  timezone: "utc",
});

db.connect((err) => {
  console.log("db connected");
  if (err) throw err;
});

module.exports = db;
