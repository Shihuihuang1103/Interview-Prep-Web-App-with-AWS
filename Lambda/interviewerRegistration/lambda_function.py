import json
import boto3
import requests
from requests.auth import HTTPBasicAuth
import pymysql
import os
import datetime


def lambda_handler(event, context):
    print(event)
    firstname = event.get('firstname')
    lastname = event.get('lastname')
    username = event.get('username')
    password = event.get('password')  # Ensure this is securely hashed before storing
    email = event.get('email')
    company = event.get('company')
    role = event.get('role')
    yoe = event.get('yoe')
    bio = event.get('bio')
    specs = event.get('skills')


    print(specs)
    try:
        conn = pymysql.connect(
            host=os.environ['DB_HOST'],
            user=os.environ['DB_USER'],
            passwd=os.environ['DB_PASSWORD'],
            db=os.environ['DB_NAME'],
            connect_timeout=5
        )
        with conn.cursor() as cur:
            # Insert into User table
            cur.execute("""
                INSERT INTO User (Firstname, Lastname, Username, Password, Email, UserType, CreationDate, LastLoginDate)
                VALUES (%s, %s, %s, %s, %s, 'Interviewer', NOW(), NOW())
                """, (firstname, lastname, username, password, email, ))
            user_id = cur.lastrowid

            # Insert into Interviewer table
            cur.execute("""
                INSERT INTO Interviewer (UserID, Company, Role, About, Yoe)
                VALUES (%s, %s, %s, %s, %s)
                """, (user_id, company, role, bio, yoe))
            interviewer_id = cur.lastrowid

            # Associate specializations
            for spec in specs:
                # Check if the specialization exists
                cur.execute("""
                    SELECT specID FROM Specialization WHERE specName = %s
                """, (spec,))
                spec_result = cur.fetchone()

                # If not exists, insert the new specialization
                if not spec_result:
                    cur.execute("""
                        INSERT INTO Specialization (specName) VALUES (%s)
                    """, (spec,))
                    spec_id = cur.lastrowid
                else:
                    spec_id = spec_result[0]

                # Insert into InterviewerHasSpec
                cur.execute("""
                    INSERT INTO InterviewerHasSpec (InterviewerID, specID)
                    VALUES (%s, %s)
                """, (interviewer_id, spec_id))

        conn.commit()
        response = {'message': 'Interviewer profile created successfully', 'interviewerID': interviewer_id}
    except Exception as e:
        print(e)
        response = {'error': str(e)}
        return {
            'statusCode': 500,
            'body': json.dumps(response)
        }
    finally:
        conn.close()



    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
