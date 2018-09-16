/** 
 * This file contains library functions for Apache Solr suggest handler
 */
const config = require('config');
const requestPromise = require("request-promise");

const SOLR = "solr";
const SUGGEST = "suggest";
const SCHEME = "http";

module.exports = function(host, port, core, suggester=None){

    this.urlOptions = {
        baseUrl: SCHEME + "://" + host + ":" + port + "/",
        uri: null,
        json: true
    }

    var getSuggesterRootUrl = function(core) {

        return SOLR + '/' + core + '/' + SUGGEST;
    }

    var getSuggestTermUrl = function(rootUrl, term) {

        return rootUrl + "?suggest.q=" + term;
    }

    this.suggestWordsForTerm = function(term) {

        var suggestRootUrl = getSuggesterRootUrl(core);
        var suggestUrlPath = getSuggestTermUrl(suggestRootUrl, term);
        this.urlOptions.uri = suggestUrlPath;

        return requestPromise(urlOptions)
            .then(function (response) {
                
                return response
                    .suggest[suggester][term]
                    .suggestions
                    .map(t => t.term);
            })
            .catch(function (err) {
                console.log("Something went wrong");
            });;
    }

    return this;
}