"use client";
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import NavInterviewee from '@/app/components/navInterviewee';
import UserPool from '@/app/services/UserPool';


const FinishedInterviews = () => {
    const[interviews, setInterviews] = useState([]);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const selectedInterviewIdRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleFeedback = (interviewId) => {
        setShowFeedbackForm(true);
        selectedInterviewIdRef.current = interviewId;
      };
    
    const handleSubmitFeedback = async() => {
        try{
          const sessionID = selectedInterviewIdRef.current;
          const feedbackData = {
            sessionID,
            rating,
            comments: comment,
            submissionDate: new Date().toISOString(),
          };
          console.log("feedbackDate:", feedbackData);
          const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/feedback`;
          const response = await fetch(apiGatewayUrl,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData),
          });
          
          if(!response.ok){
            throw new Error('Failed to submit feedback');
          }
          alert("You have successfully submiited the feedback.")
          console.log('Feedback submitted successfully');
        } catch (error){
          console.error('Error submitting feedback:', error);
        } finally{
          setShowFeedbackForm(false);
          selectedInterviewIdRef.current = null;
          setRating(0);
          setComment('');
        }
    };

    useEffect(()=> {
        const fetchInterviews = async() =>{
            try{
                const user = UserPool.getCurrentUser();

                if(user){
                    const username = user.getUsername();
                    const userID = username;
                    console.log('current user:', username);
                    const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/getInterviews/${userID}`;

                    const response = await fetch(apiGatewayUrl);
                    if(!response.ok){
                        throw new Error('Failed to fetch interviews');
                    }
                    const data = await response.json();
                    const dataBody = JSON.parse(data.body);

                    const finishedInterviews = dataBody.filter(
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
                    setInterviews(finishedInterviews);
                    
                }
            } catch (error){
                console.error('Error fetching users:', error);
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
                        Your Completed Interviews:
                    </h1>
                    <br/>
                    {interviews.length > 0 ? (
                        <ul>
                        {interviews.map(interview => (
                            <li key={interview.sessionID} className="mb-6 border-b pb-4">
                            <p>Date: {interview.date}</p>
                            <p>Time: {formatTime(interview.time)}</p>
                            <p>Interviewer: {interview.interviewerName}</p>
                            <p>Focus: {interview.focus}</p>
                            <p>Duration: {interview.duration} minutes</p>
                            <br/>
                            <button 
                            onClick={() => handleFeedback(interview.sessionID)} 
                            className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center">
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

            {/* Feedback form */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md max-w-md">
            <h2 className="text-xl font-semibold mb-4">Feedback for Interview</h2>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmitFeedback}
                className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Submit Feedback
              </button>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      );
};

export default FinishedInterviews;
