const express = require('express');
const app = express();

let config = require("./config.js"); // Import configuration

let places = require("./places");



// Places

app.get('/places', places.getAll);
app.post('/places', places.add);
app.put('/places', places.update);
app.delete('/places', places.delete);



app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`);
})