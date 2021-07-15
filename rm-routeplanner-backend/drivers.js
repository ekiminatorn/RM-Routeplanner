let db = require("./database.js");

exports.getAll = function(req, res) {
    
    db.query('SELECT * FROM drivers', function(error, results, fields){

        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
};

exports.add = function(req, res) {

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    db.query('INSERT INTO drivers (firstname, lastname) VALUES(?, ?)', [firstname, lastname], function(error, results, fields){
        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
    
};

exports.update = function(req, res) {

    let id = req.params.id;

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    db.query('UPDATE drivers SET firstname = ?, lastname = ? WHERE id = ?', [firstname, lastname, id], function(error, results, fields){
        
        if (error) return res.status(500).json({error: error});

        return res.sendStatus(200);
    })
    
};

exports.delete = async function(req, res) {

    let id = req.params.id;

    db.query('DELETE FROM drivers WHERE id = ?', id , function(error, results, fields){

        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
    
};