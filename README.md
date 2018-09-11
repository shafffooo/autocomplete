# Autocomplete
An English word autocomplete service

# Description
This application uses Apache Solr as a suggestion engine. Dictionary data is
posted to Solr instance, indexed and stored using a custom text analyzer. When
user queries a word by typing partial word, a request is made to the Solr
suggest handler that gathers top 5 terms that start with the user prefix.

# Getting Started
You can bring the Apache Solr instance and Node.js application up by running
the following query from root directory:
```
docker-compose up --build -d
```
It assumes that docker is already installed on your system and ready to use.
