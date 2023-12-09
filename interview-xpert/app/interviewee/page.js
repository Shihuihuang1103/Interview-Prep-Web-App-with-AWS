"use client";
import React from 'react';
import { useState } from 'react';
import NavInterviewee from '@/app/components/navInterviewee';

//book interview page for interviewee
const BookInterview = () => {

    const [focus, setFocus] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Implement your register logic here
        console.log(username, password);
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
                        <label for="focus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                        <select id="focus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose your interview focus</option>
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
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
