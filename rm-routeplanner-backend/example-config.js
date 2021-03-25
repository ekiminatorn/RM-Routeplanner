/*
* Copy example-config.js to config.js and add your own variables to config.js
*/

let config = {};

config.port = 3000; // Port to listen for requests

/*
* Database connection
*/
config.db_username = "username";
config.db_password = "password";
config.db_host = "localhost";
config.db_port = 3306;

module.exports = config;