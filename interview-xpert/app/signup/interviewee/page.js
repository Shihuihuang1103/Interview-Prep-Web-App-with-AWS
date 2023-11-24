"use client";
import React from 'react';
import { useState } from 'react';
import NavHome from '@/app/components/navHome';

const SignupInterviewee = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [field, setField] = useState('');
  const [yoe, setYoe] = useState('');
  const [bio, setBio] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement your register logic here
    console.log(username, password);
  };

  return (
    
      <div className="flex flex-col min-h-screen">
        <NavHome />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="p-6 max-w-md w-full bg-blue-50 shadow-md rounded-md">
            <div>
              <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                Sign up for your intereviewee account
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <br/>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <br/>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                
                <br/>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="text"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <br/>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address:
                </label>
                <input
                  type="text"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <br/>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                  School:
                </label>
                <input
                  type="text"
                  id="school"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />      

                <br/>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700">
                  Field of Study:
                </label>
                <input
                  type="text"
                  id="field"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                />   

                <br/>
                <label htmlFor="yeo" className="block text-sm font-medium text-gray-700">
                  Year of Experience:
                </label>
                <input
                  type="text"
                  id="yoe"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={yoe}
                  onChange={(e) => setYoe(e.target.value)}
                />  

                <br/>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  About:
                </label>
                <textarea
                  type="text"
                  id="bio"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />  
              </div>

              
              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>  
  );
};

export default SignupInterviewee;
