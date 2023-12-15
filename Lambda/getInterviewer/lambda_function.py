import json

import pymysql
import os

def lambda_handler(event, context):
    user_name = event.get('pathParameters', {}).get('userID')
    print(event)
    print(user_name)
    response = {}
    try:
        conn = pymysql.connect(
            host=os.environ['DB_HOST'],
            user=os.environ['DB_USER'],
            passwd=os.environ['DB_PASSWORD'],
            db=os.environ['DB_NAME'],
            connect_timeout=5
        )
        with conn.cursor() as cur:
            # SQL query to join User and Interviewee tables
            sql = """
            SELECT u.UserID, u.Firstname, u.Lastname, u.Username, u.Email, i.Company, i.Role, i.About, i.Yoe, GROUP_CONCAT(s.specName SEPARATOR ', ')
            FROM User u
            JOIN Interviewer i ON u.UserID = i.UserID
            LEFT JOIN InterviewerHasSpec ihs ON i.InterviewerID = ihs.InterviewerID
            LEFT JOIN Specialization s ON ihs.specID = s.specID
            WHERE u.Username = %s
            GROUP BY u.UserID;
            """
            cur.execute(sql, (user_name,))
            result = cur.fetchone()
            print(result)
            if result:
                response['interviewerProfile'] = {
                    'firstname': result[1],
                    'lastname': result[2],
                    'username': result[3],
                    'email': result[4],
                    'school': result[5],
                    'role': result[6],
                    'bio': result[7],
                    'yoe': result[8],
                    'spec' : result[9]
                }
            else:
                response['message'] = "Interviewer not found"
        conn.close()
    except Exception as e:
        print(e)
        response['error'] = str(e)

    # API Call (Example)
    # api_response = requests.get(f'https://example.com/api/interviewees/{user_id}')
    # Add API response data to 'response' dictionary if needed

    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
