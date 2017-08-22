const dbConnection = require('./../database/db_connection');

module.exports = (query, data, callback) => {
  dbConnection.query({text: query, values: data}, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
