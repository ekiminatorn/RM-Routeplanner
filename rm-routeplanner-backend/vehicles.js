// Vehicles places

let db = require("./database.js");

exports.getAll = function(req, res) {
    
    db.query('SELECT * FROM vehicles', function(error, results, fields){

        if (error) return res.status(500).json({error: "Error querying database"});
        
        return res.json(results);
    })
};

exports.add = function(req, res) {
    
};

exports.update = function(req, res) {
    
};

exports.delete = function(req, res) {
    
};