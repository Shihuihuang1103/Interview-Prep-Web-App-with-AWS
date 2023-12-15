import json
import pymysql
import os
import datetime

def lambda_handler(event, context):
    user_name = event.get('pathParameters', {}).get('userID')
    print(user_name)
    if not user_name:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'UserID not provided'})
        }

    response = {}
    try:
        print("connecting")
        connection = pymysql.connect(
            host=os.environ['DB_HOST'],
            user=os.environ['DB_USER'],
            passwd=os.environ['DB_PASSWORD'],
            db=os.environ['DB_NAME'],
            connect_timeout=5
        )
        print("connec")
        with connection.cursor() as cursor:
            sql = """SELECT UserType FROM User WHERE Username = %s"""
            cursor.execute(sql, (user_name,))
            print("cursor executed")
            result = cursor.fetchone()
            user_type = result[0]
        print(user_type)
        # Check the user type and execute the appropriate query
        if user_type == 'Interviewee':
            # Query the database to find all interview sessions for the interviewee
            with connection.cursor() as cursor:
                sql = """SELECT s.SessionID, u2.Username , u.Username, s.Date, s.Time, s.Duration, s.Focus, s.Detail
                         FROM User u
                         JOIN Interviewee e ON u.UserID = e.UserID
                         JOIN InterviewSession s ON e.IntervieweeID = s.IntervieweeID
                         JOIN Interviewer i ON s.InterviewerID = i.InterviewerID
                         JOIN User u2 ON i.UserID = u2.UserID
                         WHERE u.Username = %s"""
                cursor.execute(sql, (user_name,))
                result = cursor.fetchall()
        elif user_type == 'Interviewer':
            # Query the database to find all interview sessions for the interviewer
            with connection.cursor() as cursor:
                sql = """SELECT s.SessionID, u.Username, u2.Username, s.Date, s.Time, s.Duration, s.Focus, s.Detail
                         FROM User u
                         JOIN Interviewer i ON u.UserID = i.UserID
                         JOIN InterviewSession s ON i.InterviewerID = s.InterviewerID
                         JOIN Interviewee e ON s.IntervieweeID = e.IntervieweeID
                         JOIN User u2 ON e.userID = u2.UserID
                         WHERE u.Username = %s"""
                cursor.execute(sql, (user_name,))
                result = cursor.fetchall()
        else:
            # Return an error message if the user type is invalid
            return {
                'statusCode': 400,
                'body': 'Invalid user type'
            }
        print(result)
        # Format the result as a JSON array
        interviews = []
        for row in result:
            interviews.append({
                'sessionID': row[0],
                'interviewerName': row[1],
                'intervieweeName': row[2],
                'date': row[3],
                'time': row[4],
                'duration': row[5],
                'focus': row[6],
                'detail': row[7]
            })

        connection.close()
    except Exception as e:
        print(e)
        response['error'] = str(e)
        return {
            'statusCode': 500,
            'body': json.dumps(response)
        }
    for interview in interviews:
        if isinstance(interview['date'], datetime.date):
            interview['date'] = interview['date'].isoformat()
        if isinstance(interview['time'], datetime.timedelta):
            interview['time'] = interview['time'].total_seconds()
    print(interviews)
    return {
        'statusCode': 200,
        'body': json.dumps(interviews)
    }
