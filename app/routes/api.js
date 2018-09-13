/**
 * This file contains the routes to APIs
 */
const http = require("http")
var logger = require('winston'); 
const lib = require('../lib');

module.exports = function(app, solr_config) {

    /**
     * make a request to Apache Solr suggest handler for requested term
     */
    app.get('/api/suggest', (req, res) => {

        // get query parameters
        let term = req.query.term;

        // return 400 - bad request if no term
        if (term == null) {

            logger.info("Received incorrect query parameter 'term'.");
            res.status(400).json({
                "message":"You must provide query paramter 'term'."
            });

        } else {

            logger.info("Received request for '" + term + "' suggetions");

            // HTTP request to Solr suggest handler
            http.get({
                host: 'localhost',
                port: 8983,
                path:'/solr/dictionary/suggest?suggest.q=' + term
            }, 
            response => {
                let body = "";
                response.on('data', data => {
                    body += data;
                });
                response.on('end', () => {
                    let result = JSON.parse(body);
    
                    let terms = result
                        .suggest
                        .words_suggester[term]
                        .suggestions
                        .map(t => t.term);
    
                    res.send(terms);
                });
            });
        }

    });
}