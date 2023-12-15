"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import NavInterviewer from '@/app/components/navInterviewer';
import UserPool from '@/app/services/UserPool';

const InterviewerProfile = () => {

    const[userAttributes, setUserAttributes] = useState(null);

    useEffect(()=>{
       const fetchUserProfile = async() => {
        const user = UserPool.getCurrentUser();

        if(user) {
           const username = user.getUsername();
           const userID = username;
           console.log("current user:", username);
           const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getInterviewers/${userID}`;

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
            <NavInterviewer />
            <div className="flex min-h-screen bg-gray-50 justify-left items-center">
                <div className="p-6 max-w-xl w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        My Profile:
                    </h1>
                    <br/>
                    {userAttributes && userAttributes.interviewerProfile &&(
                        <div>
                            <p className="text-md mb-2">First name: {userAttributes.interviewerProfile.firstname}</p>
                            <p className="text-md mb-2">Last name: {userAttributes.interviewerProfile.lastname}</p>
                            <p className="text-md mb-2">Username: {userAttributes.interviewerProfile.username}</p>
                            <p className="text-md mb-2">Email: {userAttributes.interviewerProfile.email}</p>
                            <p className="text-md mb-2">Company: {userAttributes.interviewerProfile.school}</p>
                            <p className="text-md mb-2">Role: {userAttributes.interviewerProfile.role}</p>
                            <p className="text-md mb-2">Skills: {userAttributes.interviewerProfile.spec}</p>
                                <ul>
                                {userAttributes.skills && userAttributes.interviewerProfile.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                                </ul>
                            <p>Year of Experience: {userAttributes.interviewerProfile.yoe}</p>
                            <p>About: {userAttributes.interviewerProfile.bio}</p>
                        </div>
                   )} 
                </div>
            </div>
        </div>
      );
};

export default InterviewerProfile;