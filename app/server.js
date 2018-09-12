const config = require("config")
const express = require("express");
const expressHandleBars = require("express-handlebars");
const path = require('path');
const logger = require("./logger");

// create express app
const app = express();

// Set views
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandleBars({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

// register routes
require('./app/routes')(app);

// start server
const server_port = config.get("app.port");
app.listen(server_port, function(){
    logger.info("Express is listening at port: " + server_port);
});



