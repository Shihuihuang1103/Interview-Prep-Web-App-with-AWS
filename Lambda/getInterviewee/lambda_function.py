import json

import pymysql
import os

def lambda_handler(event, context):
    user_name = event['pathParameters']['userID']  # Get userID from API Gateway path parameter
    print(event) 
    response = {}
    try:
        print("connecting")
        conn = pymysql.connect(
            host=os.environ['DB_HOST'],
            user=os.environ['DB_USER'],
            passwd=os.environ['DB_PASSWORD'],
            db=os.environ['DB_NAME'],
            connect_timeout=5
        )
        print("connected")
        with conn.cursor() as cur:
            # SQL query to join User and Interviewee tables
            sql = """
            SELECT u.UserID, u.Firstname, u.Lastname, u.Username, u.Email, i.School, i.Field, i.Yoe, i.About
            FROM User u
            JOIN Interviewee i ON u.UserID = i.UserID
            WHERE u.Username = %s
            """
            cur.execute(sql, (user_name,))
            result = cur.fetchone()
            print(result)
            if result:
                response['intervieweeProfile'] = {
                    'firstname': result[1],
                    'lastname': result[2],
                    'username': result[3],
                    'email': result[4],
                    'school': result[5],
                    'field': result[6],
                    'yoe': result[7],
                    'bio': result[8]
                }
            else:
                response['message'] = "Interviewee not found"
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
