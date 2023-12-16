import json
import requests
import boto3
from requests.auth import HTTPBasicAuth


def lambda_handler(event, context):
    user_name = event.get('pathParameters', {}).get('username')
    skills = event.get('body', {}).get('focus')
    print(event)

    host = "https://search-interviewxpert-5blhmzmkka7zbmvorx6hv37w3a.us-east-1.es.amazonaws.com"
    os_username = 'user9223'
    os_password = 'rjzexHnWNTB-5kXK'

    index = 'interviewer'
    search_url = host + '/' + index + '/' + '_search?q=' + skills

    response = requests.get(search_url, auth=HTTPBasicAuth(os_username, os_password))
    
    response = json.loads(response.content.decode('utf-8'))
    
    username_match = ''
    
    index = 0

    for hit in response['hits']['hits']:
        if index == 0:
            username_match = hit['_source']['username']
        index = index + 1
        
    print(username_match)
    username_response = {
        "username": username_match
    }
    
    #fetch email from db
    api_interviewee = 'https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getInterviewees/%s' % user_name
    api_interviewer = 'https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getInterviewers/%s' % username_match
    
    try:
        interviewee = requests.get(api_interviewee)
        print(interviewee)
        interviewer = requests.get(api_interviewer)
        print(interviewer)
        interviewee_data = json.loads(interviewee.json()['body'])
        print("Interviewee Data:", interviewee_data)
        interviewer_data = json.loads(interviewer.json()['body'])
        print("Interviewer Data:", interviewer_data)
    except requests.RequestException as e:
        return{
            'statusCode' : 500,
            'body' : json.dumps('Error calling API: ' + str(e))
        }
    
    interviewee_name = interviewee_data['intervieweeProfile']['firstname']
    interviewee_email = interviewee_data['intervieweeProfile']['email']
    
    print(interviewee_name)
    print(interviewee_email)
    
    interviewer_name = interviewer_data['interviewerProfile']['firstname']
    interviewer_email = interviewer_data['interviewerProfile']['email']
    print(interviewer_name)
    print(interviewer_email)
    
    message_to_interviewer = {
        'Subject': {
            'Data': 'Interview Invitation From Interviewee',
            'Charset': 'UTF-8'
        },
        'Body': {
            'Text': {
                'Data': 'You have an upcoming interview session from a interviewee:\n Interviewee: '+ interviewee_name + '\n' + 'Email address: ' + interviewee_email,
                'Charset': 'UTF-8'
            }
        }
    }
    
    message_to_interviewee = {
        'Subject': {
            'Data': 'Confirmation From Interviewer',
            'Charset': 'UTF-8'
        },
        'Body': {
            'Text': {
                'Data': 'We have successfully matched you with an interviewer:\n Interviewer: '+ interviewer_name + '\n' + 'Email address: ' + interviewer_email,
                'Charset': 'UTF-8'
            }
        }
    }
    
    send_email_to_participants('zx811@nyu.edu', interviewee_email, message_to_interviewee)
    send_email_to_participants('zx811@nyu.edu', interviewer_email, message_to_interviewer)
    
    return {
        'statusCode': 200,
        'body': json.dumps(username_response)
    }

def send_email_to_participants(source_address, to_address, message):
    ses = boto3.client('ses')
    response = ses.send_email(
        Source=source_address,
        Destination={
            'ToAddresses': [
                to_address,
            ],
            'CcAddresses': [],
            'BccAddresses': []
        },
        Message=message
    )