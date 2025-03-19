#!/bin/bash

current_time=$(date +%s)

make_curl_request(){
    curl --location 'http://127.0.0.1:5000/conflictmanager' \
    --header 'Content-Type: application/json' \
    --data "$1"
}

test_case_1(){
    data='[
        {
            "conflictManagerTriggerTime": "'$current_time'",
            "test": "test"
        }
    ]'
    make_curl_request "$data"
}

case $1 in
    test_case_1)
        echo "Executing test case 1"
        test_case_1
        ;;
    *)
        echo "No test case found"
        ;;
esac
