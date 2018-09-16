/**
 * This file contains the routes to APIs
 */

var logger = require('winston'); 
const suggest = require('../lib/solr/suggest');

module.exports = function(app, solr_config) {

    const {host, port, core, suggester} = solr_config;
    this.solrSuggester = suggest(host, port, core, suggester);

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
            this.solrSuggester.suggestWordsForTerm(term)
                .then(function(response){
                    res.send(response);
                });
        }
    });
}