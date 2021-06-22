const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

let config = require("./config.js"); // Import configuration

let places = require("./places");
let vehicles = require("./vehicles");

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Places

app.get('/places', places.getAll);
app.post('/places', places.add);
app.put('/places', places.update);
app.delete('/places', places.delete);

// Vehicles

app.get('/vehicles', vehicles.getAll);
app.post('/vehicles', vehicles.add);
app.put('/vehicles/:id', vehicles.update);
app.delete('/vehicles/:id', vehicles.delete);



app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`);
})