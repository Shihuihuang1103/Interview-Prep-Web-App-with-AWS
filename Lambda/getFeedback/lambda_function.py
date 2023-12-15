import json
import pymysql
import os
import datetime

def lambda_handler(event, context):
    user_name = event.get('pathParameters', {}).get('userID')
    if not user_name:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Username not provided'})
        }

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
            # Assuming 'Feedback' table has a reference to 'SessionID' and you need to join with session details
            sql = """
            SELECT f.SessionID, u2.Username, s.Date, s.Time, f.Rating, f.Comments, f.SubmissionDate
            FROM User u
            JOIN Interviewer i ON u.UserID = i.UserID
            JOIN InterviewSession s ON i.InterviewerID = s.InterviewerID
            JOIN Interviewee e ON s.IntervieweeID = e.IntervieweeID
            JOIN User u2 ON u2.UserID = e.Userid
            JOIN Feedback f on f.SessionID = s.SessionID
            WHERE u.Username = %s
            """
            cur.execute(sql, (user_name,))
            results = cur.fetchall()

            feedbacks = [{
                'sessionID': row[0],
                'intervieweeName': row[1],
                'date': row[2],
                'time': row[3],
                'rating': row[4],
                'comments': row[5],
                'submissionDate': row[6]
            } for row in results]
        
        for row in feedbacks:
            print(type(row['submissionDate']))
            if isinstance(row['date'], datetime.date):
                row['date'] = row['date'].isoformat()
            if isinstance(row['time'], datetime.timedelta):
                row['time'] = row['time'].total_seconds()
            if isinstance(row['submissionDate'], datetime.date):
                row['submissionDate'] = row['submissionDate'].isoformat()
        response['feedbacks'] = feedbacks
        conn.close()
    except Exception as e:
        print(e)
        response['error'] = str(e)
        return {
            'statusCode': 500,
            'body': json.dumps(response)
        }

    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
