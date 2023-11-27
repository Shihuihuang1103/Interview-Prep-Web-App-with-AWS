import React from 'react';
import NavHome from './components/navHome';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavHome />
            <div className="min-h-screen bg-cover bg-center" 
                style={{ backgroundImage: "url('/homebg.jpg')" }}>
                  <div className="flex justify-center items-center min-h-screen">
                    <div className="p-6 max-w-lg w-full bg-blue-100 shadow-md rounded-md">
                        <div>
                             <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                                <p>Rock your coding interviews</p>
                                <p>Meet with mentors from TOP tech companies</p>
                                <p>Get Hired Today!</p>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;