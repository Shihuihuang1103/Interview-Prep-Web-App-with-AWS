"use client";
import React from 'react';
import { useState } from 'react';
import NavInterviewee from '@/app/components/navInterviewee';

const IntervieweeProfile = () => {

    
      return (
        <div className="flex flex-col min-h-screen">
            <NavInterviewee />
            <div className="flex min-h-screen bg-gray-50 justify-left items-center">
                <div className="p-6 max-w-sm w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        My Profile:
                    </h1>
                </div>
            </div>
        </div>
      );
};

export default IntervieweeProfile;