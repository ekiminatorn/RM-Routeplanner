let mysql = require('mysql2');
let config = require("./config.js");

let pool = mysql.createPool({
    host:               config.db_host,
    user:               config.db_username,
    password:           config.db_password,
    database:           config.db,
    connectionLimit:    10,
    typeCast: function castField( field, useDefaultTypeCasting ) {

		// If the field if a JSON field (BLOB)
		if ( ( field.type === "BLOB" ) && ( field.length == 4294967295 ) ) {

			let value = field.string();

            // Try converting the BLOB to JSON
            try {
                return JSON.parse(value);
            } catch (e) {
                // If the parsing fails (Not JSON), then just return the original value
                return value;
            }

		}

		return( useDefaultTypeCasting() );

	}
});

module.exports = pool;