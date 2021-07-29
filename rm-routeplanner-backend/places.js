// Planner places

let db = require("./database.js");

exports.getAll = function (req, res) {

    db.query('SELECT * FROM places', function (error, results, fields) {

        if (error) return res.status(500).json({ error: error });
        return res.json(results);
    })
};

exports.add = function (req, res) {

    let name = req.body.name;
    let opening_time = req.body.opening_time;
    let closing_time = req.body.closing_time;
    let twentyfourseven = req.body.twentyfourseven;
    let lat = req.body.lat;
    let lon = req.body.lon;
    let json_data = JSON.stringify(req.body.json_data); // Convert JSON to string for storage

    db.query('INSERT INTO places (name, opening_time, closing_time, twentyfourseven, lat, lon, json_data) VALUES(?, ?, ?, ?, ?, ?, ?)', [name, opening_time, closing_time, twentyfourseven, lat, lon, json_data], function(error, results, fields){
        if (error) return res.status(500).json({error: error});
        
        return res.json(results);
    })

};

exports.update = function (req, res) {

    let id = req.params.id;

    let name = req.body.name;
    let opening_time = req.body.opening_time;
    let closing_time = req.body.closing_time;
    let twentyfourseven = req.body.twentyfourseven;
    let lat = req.body.lat;
    let lon = req.body.lon;
    let json_data = JSON.stringify(req.body.json_data); // Convert JSON to string for storage

    db.query('UPDATE places SET name = ?, opening_time = ?, closing_time = ?, twentyfourseven = ?, lat = ?, lon = ?, json_data = ? WHERE id = ?', [name, opening_time, closing_time, twentyfourseven, lat, lon, json_data, id], function (error, results, fields) {

        if (error) return res.status(500).json({ error: error });

        return res.sendStatus(200);
    })

};

exports.delete = function (req, res) {

};