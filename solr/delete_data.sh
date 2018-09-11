#!/bin/bash

curl "http://localhost:8983/solr/dictionary/update?commit=true" \
    -H "Content-Type: text/xml" \
    --data-binary '<delete><query>*:*</query></delete>'

if [[ $? -eq 0 ]]; then
    echo "Successfully deleted dictionary data to solr"
    exit 0
fi

# else, let user know something went wrong
echo "Failed to delete dictionary data to solr"
exit 1
