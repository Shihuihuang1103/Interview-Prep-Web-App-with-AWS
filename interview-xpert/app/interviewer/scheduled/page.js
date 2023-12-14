"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import NavInterviewer from '@/app/components/navInterviewer';
import UserPool from '@/app/services/UserPool';

const ScheduledInterviews = () => {
    const[interviews, setInterviews] = useState([]);

    useEffect(()=> {
        const fetchInterviews = async() =>{
            try{
                const user = UserPool.getCurrentUser();

                if(user){
                    const username = user.getUsername();
                    const userID = username
                    console.log('current user:', username);
                    const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getInterviews/${userID}`;
                    
                    const response = await fetch(apiGatewayUrl);
                    if(!response.ok){
                        throw new Error('Failed to fetch interviews');
                    }
                    const data = await response.json();
                    console.log(data.body);
                    const dataBody = JSON.parse(data.body);

                    if(Array.isArray(dataBody)){
                        const upcomingInterviews = dataBody.filter(
                        interview => {
                            const interviewDate = new Date(interview.date);
                            const interviewTimeInSeconds = interview.time;
                            const interviewDateTime = new Date(interviewDate);
                          
                            // Set the time in milliseconds since midnight
                            interviewDateTime.setSeconds(interviewTimeInSeconds);
                          
                            // Compare with the current time
                            console.log(new Date());
                            return interviewDateTime < new Date();
                           

                    });
                    setInterviews(upcomingInterviews);
                    } else{
                        console.error('Invalid data format: not an array');
                        setInterviews([]);
                    }
                    //setInterviews(dataBody);
                    console.log(interviews);
                }
            } catch (error){
                console.error('Error fetching users:', error);
                setInterviews([]);
            }
        };
        fetchInterviews();
    },[]);
    
      return (
        <div className="flex flex-col min-h-screen">
            <NavInterviewer />
            <div className="flex min-h-screen bg-gray-50 justify-left items-center">
                <div className="p-6 max-w-xl w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        Completed sessions:
                    </h1>
                    <br/>
                    {interviews.length > 0 ? (
                        <div>
                        <ul>
                        <br/>
                        {interviews.map(interview => (
                            <li key={interview.id} className="mb-6 border-b pb-4">
                            <p>Date: {interview.date}</p>
                            <p>Time: {interview.time}</p>
                            <p>Interviewer: {interview.interviewerName}</p>
                            <p>Focus: {interview.focus}</p>
                            <p>Duration: {interview.duration} </p>
                            </li>
                        ))}
                        </ul>
                        </div>
                        
                        ) : (
                            <p>No Completed Sessions</p>
                         )}
                </div>
            </div>
        </div>
      );
};

export default ScheduledInterviews;