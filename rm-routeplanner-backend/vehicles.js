// Vehicles places

let db = require("./database.js");

exports.getAll = function(req, res) {
    
    db.query('SELECT * FROM vehicles', function(error, results, fields){

        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
};

exports.add = function(req, res) {
    
};

exports.update = function(req, res) {
    
};

exports.delete = async function(req, res) {

    let id = req.params.id;

    db.query('DELETE FROM vehicles WHERE id = ?', id , function(error, results, fields){

        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
    
};