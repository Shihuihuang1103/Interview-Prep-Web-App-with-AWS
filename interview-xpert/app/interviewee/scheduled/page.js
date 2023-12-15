"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import NavInterviewee from '@/app/components/navInterviewee';
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
                            return interviewDateTime > new Date();
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

      function formatTime(secondsSinceMidnight){
        const interviewTime = new Date(0);
        interviewTime.setSeconds(secondsSinceMidnight);
        const hours = interviewTime.getUTCHours().toString().padStart(2, '0');
        const minutes = interviewTime.getUTCMinutes().toString().padStart(2, '0');
        let apm = "";
        if(hours > 12){
            apm = "PM";
        } else{
            apm = "AM";
        }
        return `${hours}:${minutes} ${apm}`;
      }

      return (
        <div className="flex flex-col min-h-screen">
            <NavInterviewee />
            <div className="flex min-h-screen bg-gray-50 justify-left items-center">
                <div className="p-6 max-w-xl w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        Your upcoming interviews:
                    </h1>
                    <br/>
                    {interviews.length > 0 ? (
                        <div>
                        <ul>
                        <br/>
                        {interviews.map(interview => (
                            <li key={interview.sessionID} className="mb-6 border-b pb-4">
                            {console.log("sessionID:",interview.sessionID)}
                            <p>Date: {interview.date}</p>
                            <p>Time: {formatTime(interview.time)}</p> 
                            <p>Interviewer: {interview.interviewerName}</p>                          
                            <p>Focus: {interview.focus}</p>
                            <p>Duration: {interview.duration} minutes</p>
                            <p>Meeting Detail: {interview.detail} </p>
                            </li>
                        ))}
                        </ul>
                        <a  
                         href="https://app.chime.aws/meetings"
                         target="_blank" 
                         className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                            Enter Your Interview Session
                         </a>
                        </div>
                        
                        ) : (
                            <p>No upcoming interviews</p>
                         )}
                </div>
            </div>
        </div>
      );
};

export default ScheduledInterviews;
