/**
 * This file contains the routes for frontend views.
 * 
 * These views are decoupled from application and will be served by NGINX in
 * production.
 */
module.exports = function(app) {

    /**
     *  return HTML search page when user visits root 
     */
    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

}