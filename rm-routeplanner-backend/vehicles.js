// Vehicles places

let db = require("./database.js");

exports.getAll = function(req, res) {
    
    db.query('SELECT * FROM vehicles', function(error, results, fields){

        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
};

exports.add = function(req, res) {

    let name = req.body.name;
    let nickname = req.body.nickname;
    let reg_plate = req.body.reg_plate;

    db.query('INSERT INTO vehicles (name, nickname, reg_plate) VALUES(?, ?, ?)', [name, nickname, reg_plate], function(error, results, fields){
        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
    
};

exports.update = function(req, res) {

    let id = req.params.id;

    let name = req.body.name;
    let nickname = req.body.nickname;
    let reg_plate = req.body.reg_plate;

    db.query('UPDATE vehicles SET name = ?, nickname = ?, reg_plate = ? WHERE id = ?', [name, nickname, reg_plate, id], function(error, results, fields){
        
        if (error) return res.status(500).json({error: error});

        return res.sendStatus(200);
    })
    
};

exports.delete = async function(req, res) {

    let id = req.params.id;

    db.query('DELETE FROM vehicles WHERE id = ?', id , function(error, results, fields){

        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })
    
};