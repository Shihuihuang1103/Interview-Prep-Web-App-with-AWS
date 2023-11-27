"use client";
import React from 'react';
import { useState } from 'react';
import NavInterviewer from '@/app/components/navInterviewer';

const InterviewRequest = () => {

    
      return (
        <div className="flex flex-col min-h-screen">
            <NavInterviewer />
            <div className="flex min-h-screen bg-gray-50 justify-left items-center">
                <div className="p-6 max-w-sm w-full bg-blue-50 shadow-md rounded-md">
                    <h1 className='text-center font-bold text-2xl text-blue-800'> 
                        Your interview requests:
                    </h1>
                </div>
            </div>
        </div>
      );
};

export default InterviewRequest;