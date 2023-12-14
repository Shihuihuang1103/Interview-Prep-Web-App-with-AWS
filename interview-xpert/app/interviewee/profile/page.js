"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import NavInterviewee from '@/app/components/navInterviewee';
import UserPool from '@/app/services/UserPool';


const IntervieweeProfile = () => {
     const[userAttributes, setUserAttributes] = useState('');

     useEffect(()=>{
        const fetchUserProfile = async() => {
         const user = UserPool.getCurrentUser();

         if(user) {
            const username = user.getUsername();
            const userID = username;
            console.log("current user:", username);
            const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getInterviewees/${userID}`;
            console.log("API Gateway URL:", apiGatewayUrl);

            try{
                const response = await fetch(apiGatewayUrl);
                if(!response.ok){
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                console.log("Received Data:", data.body);
                setUserAttributes(JSON.parse(data.body));

            }catch(error){
                console.error('Error fetching user profile:', error);
            }
         }
         
        };
        fetchUserProfile();
    },[]);

      return (
        <div className="flex flex-col min-h-screen">
            <NavInterviewee />
            <div className="flex min-h-screen bg-gray-50 justify-left items-center">
                <div className="p-6 max-w-xl w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        My Profile:
                    </h1>
                    <br/>
                    {userAttributes &&  (
                        <div >
                            <p className="text-md mb-2">First name: {userAttributes.intervieweeProfile.firstname}</p>
                            <p className="text-md mb-2">Last name: {userAttributes.intervieweeProfile.lastname}</p>
                            <p className="text-md mb-2">Username: {userAttributes.intervieweeProfile.username}</p>
                            <p className="text-md mb-2">Email: {userAttributes.intervieweeProfile.email}</p>
                            <p className="text-md mb-2">School: {userAttributes.intervieweeProfile.school}</p>
                            <p className="text-md mb-2">Field: {userAttributes.intervieweeProfile.field}</p>
                            <p className="text-md mb-2">Year of Experience: {userAttributes.intervieweeProfile.yoe}</p>
                            <p className="text-md mb-2">About: {userAttributes.intervieweeProfile.bio}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      );
};

export default IntervieweeProfile;