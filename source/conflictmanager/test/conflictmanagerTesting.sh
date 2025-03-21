#!/bin/bash

current_time=$(date +%s)

make_curl_request_for_conflictmanager(){
    curl --location 'http://127.0.0.1:5000/conflictmanager' \
    --header 'Content-Type: application/json' \
    --data "$1"
}

make_curl_request_for_conflictmanager_lecturer_scheduling(){
    curl --location 'http://127.0.0.1:5000/conflictmanager/lecturerscheduling' \
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
    make_curl_request_for_conflictmanager "$data"
}

test_case_2(){
    data='[
        {
            "conflictManagerTriggerTime": "'$current_time'",
            "test": "test"
        }
    ]'
    make_curl_request_for_conflictmanager_lecturer_scheduling "$data"
}

case $1 in
    test_case_1)
        echo "Executing test case 1"
        test_case_1
        ;;
    test_case_2)
        echo "Executing test case 2"
        test_case_2
        ;;
    *)
        echo "No test case found"
        ;;
esac
