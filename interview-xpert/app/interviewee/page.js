"use client";
import React from 'react';
import { useState } from 'react';
import NavInterviewee from '@/app/components/navInterviewee';
import UserPool from '../services/UserPool';

//book interview page for interviewee
const BookInterview = () => {

    const user = UserPool.getCurrentUser();
    //const username = user.getUsername();
    const username = user ? user.getUsername() : null;

    console.log('Current user username:', username);

    const [focus, setFocus] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const interviewSession = {
           focus,
           date,
           time,
           duration, 
        };

        const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/scheduleInterviews/${username}`;

        try{
        const response = await fetch(apiGatewayUrl, {
            method:'POST',
            mode:'cors',
            headers:{
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(interviewSession),
        });

        if(!response.ok){
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log("Interview successfully scheduled", data);
        } catch(error){
        console.error('Interview schedule failed', error);
        }
      };
    
      return (
        <div className="flex flex-col min-h-screen">
            <NavInterviewee />
            <div className="flex min-h-screen bg-gray-50 justify-center items-center">
                <div className="p-6 max-w-sm w-full bg-blue-50 shadow-md rounded-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                        <h1 className='text-center font-bold text-2xl text-blue-800'> 
                            Schedule A New Interview 
                        </h1>
                        <br/>
                        <label htmlFor="focus" className="block text-sm font-medium text-gray-700">Choose your interview type:</label>
                        <select 
                          id="focus" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value = {focus}
                          onChange={(e)=>setFocus(e.target.value)}
                        >
    
                        <option value="Data Structure and Algorithm">Data Structure and Algorithm</option>
                        <option value="System Design">System Design</option>
                        <option value="Behavioral Questions">Behavioral Questions</option>
                        <option value="Career Coaching">Career Coaching</option>
                        </select>
                        </div>
                        <div className="mb-6">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        </div>
                        <div className="mb-6">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Time:
                        </label>
                        <input
                            type="time"
                            id="time"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        </div>
                        
                       
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Interview Sesion: </label>
                        <select 
                          id="duration" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value = {duration}
                          onChange={(e)=>setDuration(e.target.value)}
                        >
                        <option value="30">30 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="90">90 minutes</option>
                        </select>
                        
                        <div>
                             <br/>
                        </div>
                        <div>
                        <button type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                            Request Interview
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      );
};

export default BookInterview;
