#!/bin/bash

curl "http://localhost:8983/solr/dictionary/update/csv?commit=true" \
    --data-binary @./data/dictionary.csv \
    -H 'Content-type:text/plain; charset=utf-8' && \
    curl "http://localhost:8983/solr/dictionary/suggest?suggest.build=true"

if [[ $? -eq 0 ]]; then
    echo "Successfully posted dictionary data to solr"
    exit 0
fi

# else, let user know something went wrong
echo "Failed to post dictionary data to solr"
exit 1
