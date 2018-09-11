const express    = require("express");
const expressHandleBars = require("express-handlebars");
const path = require('path');
const bodyParser = require("body-parser")

const app = express();

// Get url parameters
app.use(bodyParser.urlencoded({extended: true}));

// Set views
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandleBars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const listen_port = 8000;

// register routes
require('./app/routes')(app, {});

// start server
app.listen(listen_port, function(){
    console.log("Express is listening at port: " + listen_port)
});



