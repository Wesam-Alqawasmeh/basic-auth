'use strict';

// 3rd Party Resources
const express = require('express');

const authRouter = require('./auth/router');

const pathNotFound = require('./error-handlers/404');
const errorsHandler = require('./error-handlers/500');

const logger = require('./middlewares/logger');

require('dotenv').config();

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

app.use(logger);

app.use(authRouter);

// PORT number
const PORT = process.env.PORT || 8080;

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// home route
app.get('/', (req, res) => {
    res.status(200).send('Server is working ^_^');
});


// error handlers
app.use('*', pathNotFound);
app.use(errorsHandler);

// start function
function start(){
    app.listen(PORT, () => {
        console.log(`Server up on port ${PORT}`);
    })
};


module.exports = {
    server: app,
    start: start
};