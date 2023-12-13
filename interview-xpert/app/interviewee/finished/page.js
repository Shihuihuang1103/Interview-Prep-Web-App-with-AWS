"use client";
import React from 'react';
import { useState, useEffect } from 'react';
//import { useRouter } from 'next/navigation';
import NavInterviewee from '@/app/components/navInterviewee';
import UserPool from '@/app/services/UserPool';


const FinishedInterviews = () => {
    //const { push } = useRouter();
    const[interviews, setInterviews] = useState([]);

    const handleFeedback = (interviewId) => {
        //push(`interviewee/feedback?interviewId=${interviewId}`);
        console.log(`Feedback for interview ${interviewId}`);
    }

    useEffect(()=> {
        const fetchInterviews = async() =>{
            try{
                const user = UserPool.getCurrentUser();

                if(user){
                    const username = user.getUsername();
                    console.log('current user:', username);
                    const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getInterviews/${username}`;

                    const response = await fetch(apiGatewayUrl);
                    if(!response.ok){
                        throw new Error('Failed to fetch interviews');
                    }
                    const data = await response.json();
                    const finishedInterviews = data.filter(
                        interview => new Date(`${interview.date} ${interview.time}`) < new Date());
                    setInterviews(finishedInterviews);
                }
            } catch (error){
                console.error('Error fetching users:', error);
            }
        };
        fetchInterviews();
    },[]);

    
      return (
        <div className="flex flex-col min-h-screen">
            <NavInterviewee />
            <div className="flex min-h-screen bg-gray-50 justify-left items-center">
                <div className="p-6 max-w-sm w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        Your Completed Interviews:
                    </h1>
                    {interviews.length > 0 ? (
                        <ul>
                        {interviews.map(interview => (
                            <li key={interview.id}>
                            <p>Interviewer: {interview.interviewerName}</p>
                            <p>Focus: {interview.focus}</p>
                            <p>Date: {interview.date}</p>
                            <p>Time: {interview.time}</p>
                            <p>Duration: {interview.duration} </p>
                            <button onClick={() => handleFeedback(interview.id)}>
                             Give Feedback
                            </button>
                            </li>
                        ))}
                        </ul>
                        ) : (
                            <p>No completed interviews</p>
                         )}
                </div>
            </div>
        </div>
      );
};

export default FinishedInterviews;
