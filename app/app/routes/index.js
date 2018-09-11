const solrRoutes = require("./solr_routes");

module.exports = function(app, db) {
    solrRoutes(app);    
}