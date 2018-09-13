const config = require("config")
const express = require("express");
const expressHandleBars = require("express-handlebars");
const path = require('path');

// configure log application wide
const logger = require("./logger");

// get application configurations
const app_conf = config.get("app");
const solr_conf = config.get("solr")

// create express app
const app = express();

// set path for static files like HTML, css etc.
app.use(express.static('static'))

// register routes for views and apis
const routes = require("./routes");
routes.viewRoutes(app);
routes.apiRoutes(app, solr_conf);

// start server
const server_port = app_conf.port;
app.listen(server_port, function(){
    logger.info("Express is listening at port: " + server_port);
});



