import json

import pymysql
import os

def lambda_handler(event, context):
    print(event)
    session_id = event.get("sessionID")
    rating = event.get("rating")
    comments = event.get("comments")
    submission_date = event.get("submissionDate")
    try:
        conn = pymysql.connect(
            host=os.environ['DB_HOST'],
            user=os.environ['DB_USER'],
            passwd=os.environ['DB_PASSWORD'],
            db=os.environ['DB_NAME'],
            connect_timeout=5
        )
        with conn.cursor() as cur:
            # Insert into Feedback table
            cur.execute("""
                INSERT INTO Feedback (SessionID, Rating, Comments, SubmissionDate)
                VALUES (%s, %s, %s, %s)
                """, (session_id, rating, comments, submission_date))
            conn.commit()

        response = {
            'message': 'Feedback submitted successfully'
        }
        conn.close()
    except Exception as e:
        print(e)
        response = {'error': str(e)}
        return {
            'statusCode': 500,
            'body': json.dumps(response)
        }

    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }