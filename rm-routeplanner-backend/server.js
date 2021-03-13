const express = require('express');
const app = express();

let config = require("./config.js"); // Import configuration

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`);
})