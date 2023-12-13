"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import NavInterviewee from '@/app/components/navInterviewee';
import UserPool from '@/app/services/UserPool';


const IntervieweeProfile = () => {

     const[userAttributes, setUserAttributes] = useState(null);

     useEffect(()=>{
        const fetchUserProfile = async() => {
         const user = UserPool.getCurrentUser();

         if(user) {
            const username = user.getUsername();
            console.log("current user:", username);
            const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getInterviewees/${username}`;

            try{
                const response = await fetch(apiGatewayUrl);
                if(!response.ok){
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                console.log(data);
                setUserAttributes(data);
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
                <div className="p-6 max-w-sm w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        My Profile:
                    </h1>
                    {userAttributes && (
                        <div>
                            <p>First name: {userAttributes.firstname}</p>
                            <p>Last name: {userAttributes.lastname}</p>
                            <p>Username: {userAttributes.username}</p>
                            <p>Email: {userAttributes.email}</p>
                            <p>School: {userAttributes.school}</p>
                            <p>Field: {userAttributes.field}</p>
                            <p>Year of Experience: {userAttributes.yoe}</p>
                            <p>About: {userAttributes.bio}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      );
};

export default IntervieweeProfile;