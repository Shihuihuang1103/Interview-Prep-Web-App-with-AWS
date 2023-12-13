import Link from 'next/link';
import { logout } from '../services/authenticate';

const NavInterviewee = () => {

  const handleLogout = () => {
    logout();
  }
    return (
      <nav className="bg-blue-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo and brand name */}
              <div>
                <a href="/" className="flex items-center py-5 px-2 text-white">
                  <span className="font-semibold text-xl">InterviewXpert</span>
                </a>
              </div>
              {/* Primary Nav */}
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/interviewee" className="py-5 px-3 text-white">Get Interviewed</Link>
                <Link href="/interviewee/scheduled" className="py-5 px-3 text-white">Upcoming Interviews</Link>
                <Link href="/interviewee/finished" className="py-5 px-3 text-white">Completed Sessions</Link>

              </div>
            </div>
            {/* Secondary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/interviewee/profile" className="py-2 px-3 bg-blue-700 text-white rounded mr-2">Profile</Link>
              <button onClick={handleLogout} className="py-2 px-3 bg-blue-700 text-white rounded mr-2">Logout</button>

            </div>
           
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavInterviewee;
  