import React from 'react';
import NavHome from '../components/navHome';

//Signup Page: two options
const Signup = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHome />
        <div className="flex min-h-screen bg-gray-50 justify-center items-center">
          <div className="p-6 max-w-sm w-full bg-blue-50 shadow-md rounded-md">
            <div className="mb-4">
                <h1 className='text-center font-bold text-2xl text-blue-800'> 
                  Sign Up 
                </h1>
            </div>
            <div className="mt-10 text-center">
              <a href="signup/interviewee" type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                Register as Interviewee
              </a>
            </div>
            <div className="mt-10 text-center">
              <a href="signup/interviewer" type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                Register as Interviewer
              </a>
            </div>
            <div className="mt-4 text-center">
            <a href="/" className="text-sm text-blue-800 hover:underline">
              Already have an account? Login here
            </a>
          </div>
          </div>
        </div>    
    </div>
  );
};

export default Signup;
