const fs = require('fs');

const dbConnection = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log(`table created with result : ${res}`);
  }
});
