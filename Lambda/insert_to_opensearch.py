import json
import requests
from requests.auth import HTTPBasicAuth
import pymysql
import os
import datetime


def lambda_handler(event, context):
    print(event)
    username = event.get('username')
    skills = event.get('skills')

    opensearch_endpoint = "https://search-interviewxpert-5blhmzmkka7zbmvorx6hv37w3a.us-east-1.es.amazonaws.com"
    os_username = 'user9223'
    os_password = 'rjzexHnWNTB-5kXK'

    opensearch_payload = {
        'username': username,
        'skills': skills
    }
    
    insert_into_opensearch(opensearch_payload, opensearch_endpoint, HTTPBasicAuth(os_username, os_password))


def insert_into_opensearch(opensearch_payload, opensearch_endpoint, http_auth):
    headers = {'Content-Type': 'application/json'}
    host = opensearch_endpoint
    index = 'interviewer'
    datatype = '_doc'
    url = host + '/' + index + '/' + datatype

    response = requests.post(url, auth=http_auth, headers=headers, json=opensearch_payload)

    if response.status_code == 200 or response.status_code == 201:
        res = f"Request successful. Response: {response.text}"
    else:
        res = f"HTTP request failed，Response: {response.status_code}, Body: {response.text}"

    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }
