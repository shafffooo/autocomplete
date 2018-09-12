const http = require("http")
var logger = require('winston'); 

module.exports = function(app) {

    /**
     *  return HTML search page when user visits root 
     */
    app.get('/', (req, res) => {
        res.render('search');
    });

    /**
     * make a request to Solr suggest handler for given term
     */
    app.get('/suggest', (req, res) => {

        // get query parameters
        let term = req.query.term;

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

    });
}