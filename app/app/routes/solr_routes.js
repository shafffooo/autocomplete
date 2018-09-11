const http = require("http")

module.exports = function(app, db) {
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/suggest', (req, res) => {
        let term = req.query.term;

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