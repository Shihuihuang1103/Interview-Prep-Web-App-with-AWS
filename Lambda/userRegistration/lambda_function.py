import json

import pymysql
import os

def lambda_handler(event, context):
    print(event)
    firstname = event.get('firstname')
    lastname = event.get('lastname')
    username = event.get('username')
    password = event.get('password')  # Ensure this is securely hashed before storing
    email = event.get('email')
    school = event.get('school')
    field = event.get('field')
    yoe = event.get('yoe')
    bio = event.get('bio')
    print(username)
    if not all([firstname, lastname, username, password, email, school, field, yoe, bio]):
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Missing required data'})
        }

    try:
        conn = pymysql.connect(
            host=os.environ['DB_HOST'],
            user=os.environ['DB_USER'],
            passwd=os.environ['DB_PASSWORD'],
            db=os.environ['DB_NAME'],
            connect_timeout=5
        )
        user_insert_query = """
        INSERT INTO User (Firstname, Lastname, Username, Password, Email, UserType, CreationDate, LastLoginDate)
        VALUES (%s, %s, %s, %s, %s, 'Interviewee', NOW(), NOW())
        """
        #Note: changed 'interviewer' to 'interviewee' in the above query
        
        cursor = conn.cursor()
        cursor.execute(user_insert_query, (firstname, lastname, username, password, email))
        user_id = cursor.lastrowid
        
        interviewee_insert_query = """
        INSERT INTO Interviewee (UserID, School, Field, Yoe, About)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(interviewee_insert_query, (user_id, school, field, yoe, bio))
        
        # Commit the transaction
        conn.commit()

        # Close the cursor and connection
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Register success', 'userID': user_id})
        }
        
    except Exception as e:
        print(e)
        return {
            'statusCode': 405,
            'body': json.dumps({'message': 'Method Not Allowed'})
        }

