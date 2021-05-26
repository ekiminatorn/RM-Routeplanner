let mysql = require('mysql');
let config = require("./config.js");

let pool = mysql.createPool({
    host:               config.db_host,
    user:               config.db_username,
    password:           config.db_password,
    database:           config.db,
    connectionLimit:    10
});

module.exports = pool;