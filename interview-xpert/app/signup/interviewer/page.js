"use client";
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavHome from '@/app/components/navHome';
import UserPool from "@/app/services/UserPool";


const SignupInterviewer = () => {
  const { push } = useRouter();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [yoe, setYoe] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);

  const skillOptions = [
    'Data Structure and Algorithm',
    'System Design',
    'Behavioral Questions',
    'Career Coaching',
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const attributeList = [];
    attributeList.push(
      {Name:'email',Value:email},
      {Name:'custom:Role', Value:'interviewer'}
    )
    UserPool.signUp(username,password,attributeList,null, (err, data)=>{
       if(err){
        console.error(err);
       } 
       console.log(data);
    });

    const interviewerUser = {
      firstname,
      lastname,
      username,
      password,
      email,
      company,
      role,
      yoe,
      skills,
      bio,
    };
    console.log(skills);
    const apiGatewayUrl = 'https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/register/interviewers';

    try{
      const response = await fetch(apiGatewayUrl, {
        method:'POST',
        mode:'cors',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewerUser),
      });

      if(!response.ok){
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      alert('Account created successfully. Redirecting to login page...');
      push('/login');
    } catch(error){
      console.error('Registration failed', error);
      alert('Account created failed. Please try again...');

    }
  };

  return (
    
      <div className="flex flex-col min-h-screen">
        <NavHome />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="p-6 max-w-md w-full bg-blue-50 shadow-md rounded-md">
            <div>
              <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                Sign up for your interviewer account
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
                  style={{ paddingLeft: '5px' }} 
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
                  style={{ paddingLeft: '5px' }} 
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
                  style={{ paddingLeft: '5px' }} 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                
                <br/>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={{ paddingLeft: '5px' }} 
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
                  style={{ paddingLeft: '5px' }} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <br/>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company:
                </label>
                <input
                  type="text"
                  id="company"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={{ paddingLeft: '5px' }} 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />      

                <br/>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={{ paddingLeft: '5px' }} 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />   

                <br/>
                <label htmlFor="yeo" className="block text-sm font-medium text-gray-700">
                  Year of Experience:
                </label>
                <input
                  type="text"
                  id="yoe"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={{ paddingLeft: '5px' }} 
                  value={yoe}
                  onChange={(e) => setYoe(e.target.value)}
                />  

                <br/>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills: hold Ctrl button to select multiple</label>
                    <select
                        id="skills"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        multiple
                        value={skills}
                        onChange={(e) => setSkills(Array.from(e.target.selectedOptions, (option) => option.value))}
                    >
                        {skillOptions.map((skill, index) => (
                            <option key={index} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                <br/>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  About:
                </label>
                <textarea
                  type="text"
                  id="bio"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={{ paddingLeft: '5px' }} 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />  
              </div>

              
              <div>
                <button onClick={handleSubmit} type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
  );
};

export default SignupInterviewer;
