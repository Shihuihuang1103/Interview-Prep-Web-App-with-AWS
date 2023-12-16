import json

import pymysql
import os

def lambda_handler(event, context):
    print(event)
    intervieweeName = event.get('intervieweeName')
    interviewerName = event.get('interviewerName')
    focus = event.get('focus')
    date = event.get('date')
    time = event.get('time')
    duration = event.get('duration')
    detail = "AWS Chime Meeting ID: 3597269999"
    print(intervieweeName)
    print(interviewerName)
    print(focus)
    print(date)
    print(time)
    print(duration)
    print(detail)
    
    try:
        conn = pymysql.connect(
            host=os.environ['DB_HOST'],
            user=os.environ['DB_USER'],
            passwd=os.environ['DB_PASSWORD'],
            db=os.environ['DB_NAME'],
            connect_timeout=5
        )
        
        with conn.cursor() as cur:
            cur.execute("SELECT IntervieweeID FROM User u JOIN Interviewee i ON u.userID = i.userID WHERE u.username = %s",(intervieweeName,))
            result = cur.fetchone()
            intervieweeID = result[0]
            
            cur.execute("SELECT InterviewerID FROM User u JOIN Interviewer e ON u.userID = e.userID WHERE u.username = %s",(interviewerName,))
            result = cur.fetchone()
            interviewerID = result[0]
            # SQL query to insert a new interview session
            
            sql = """
            INSERT INTO `InterviewSession` (InterviewerID, IntervieweeID, Date, Time, Duration, Focus, Detail)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            # Decide who is the interviewer and interviewee based on your application logic
            # For now, assuming user_id is the InterviewerID
            cur.execute(sql, (interviewerID, intervieweeID, date, time, duration, focus, detail))
            conn.commit()

        response = {
            'message': 'Interview session scheduled successfully'
        }
        conn.close()
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 405,
            'body': json.dumps({'message': 'Method Not Allowed'})
        }




