"use client";
import React from 'react';
import { useState,useEffect } from 'react';
import NavInterviewer from '@/app/components/navInterviewer';
import UserPool from '@/app/services/UserPool';

const MyFeedback = () => {
    const[interviews, setInterviews] = useState([]);
    const[feedbacks, setFeedbacks] = useState([]);

    useEffect(()=> {
        const fetchFeedbacks = async() =>{
            try{
                const user = UserPool.getCurrentUser();

                if(user){
                    const username = user.getUsername();
                    const userID = username
                    console.log('current user:', username);
                    const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getFeedback/${userID}`;
                    
                    const response = await fetch(apiGatewayUrl);
                    if(!response.ok){
                        throw new Error('Failed to fetch interviews');
                    }
                    const data = await response.json();
                    if(data){
                        console.log(data.body);
                        const dataBody = JSON.parse(data.body);
                        const feedbackData = dataBody.feedbacks;
                        console.log("feedbackData:", feedbackData);
                        setFeedbacks(feedbackData);
                    }else{
                        console.log("No data received.")
                    }
                }
            } catch (error){
                console.error('Error fetching users:', error);
                setInterviews([]);
            }
        };
        fetchFeedbacks();
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
            <NavInterviewer />
            <div className="flex min-h-screen bg-gray-50 justify-left items-center">
                <div className="p-6 max-w-xl w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        My Feedback:
                    </h1>
                    <br/>
                    {feedbacks.length > 0 ? (
                        <div>
                        <ul>
                        <br/>
                        {feedbacks.map(feedback => (
                            <li key={feedback.sessionID} className="mb-6 border-b pb-4">
                            <p className="text-md mb-2">Date: {feedback.date}</p>
                            <p className="text-md mb-2">Time: {formatTime(feedback.time)}</p>
                            <p className="text-md mb-2">Interviewee: {feedback.intervieweeName}</p>
                            <p className="text-md mb-2">Rating: {feedback.rating}</p>
                            <p className="text-md mb-2">Comment: {feedback.comments} </p>
                            <p className="text-md mb-2">Submission Date: {feedback.submissionDate}</p>
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

export default MyFeedback;