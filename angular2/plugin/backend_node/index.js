'use strict'

// require dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// require our custom dependencies
const router = require('./router');
const config = require('./config');

const app = express();

const PORT = process.env.PORT || 80;
// mongoose.connect('mongodb://' + config.dbUser + ':' + config.dbPassword + '@' + config.dbName);

// get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../build'));
app.use('/', router);


app.listen(PORT, function() {
    console.log('Example app listening on port', PORT);
});

