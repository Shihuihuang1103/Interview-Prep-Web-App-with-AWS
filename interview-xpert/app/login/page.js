
"use client";
import { useState } from 'react';
import NavHome from '@/app/components/navHome';
import { authenticate } from '../services/authenticate';

//Login Page
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const userData = await authenticate(username, password);
      console.log('userRole:', userData.role);
      if(userData.role === 'interviewee'){
        window.location.href = '/interviewee';
      } else if(userData.role === 'interviewer'){
        window.location.href = '/interviewer';
      } else{
        console.error('Uknown user type:', userData.Role);
      }
      
    } catch(err){
      console.error(err);
      alert('Login failed. Please check your username and password.');
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
                Sign in 
              </h1>
              <br/>
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
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                style={{ paddingLeft: '5px' }} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a href="signup" className="text-sm text-blue-800 hover:underline">
              Don’t have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
