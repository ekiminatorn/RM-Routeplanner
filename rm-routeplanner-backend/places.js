// Planner places

let db = require("./database.js");

exports.getAll = function(req, res) {

    db.query('SELECT * FROM places', function(error, results, fields){

        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
};

exports.add = function(req, res) {
    
};

exports.update = function(req, res) {
    
};

exports.delete = function(req, res) {
    
};