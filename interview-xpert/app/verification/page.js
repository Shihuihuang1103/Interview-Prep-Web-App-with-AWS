"use client";
import React from 'react';
import { useState } from 'react';
import NavHome from '@/app/components/navHome';
import { confirmSignUp } from '../services/confirmSignUp'; 
import Link from 'next/link';

const Verification = () => {
    const [username, setUsername] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        // service add here
        await confirmSignUp(username, verificationCode);
        alert('Email verification successful. You can now access your account.');
      } catch (err) {
        console.error(err);
        alert('Email verification failed. Please check your username and verification code.');
      }
    };

    return (
      <div className="flex flex-col min-h-screen">
        <NavHome />
        <div className="flex min-h-screen bg-gray-50 justify-center items-center">
          <div className="p-6 max-w-sm w-full bg-blue-50 shadow-md rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h1 className='text-center font-bold text-2xl text-blue-800'>
                  Email Verification
                </h1>
                <br />
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  style={{ paddingLeft: '5px' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  Verification Code:
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  style={{ paddingLeft: '5px' }}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                >
                  Verify Email
                </button>

                <div className="mt-4 text-center">
                <Link href="/login">
                  <button className="text-blue-800 hover:underline text-sm">
                    Skip for Now
                  </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Verification;