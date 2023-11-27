import Link from 'next/link';

const NavInterviewer = () => {
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
                <Link href="/interviewer" className="py-5 px-3 text-white">Interview Request</Link>
                <Link href="/interviewer/scheduled" className="py-5 px-3 text-white">Upcoming Interviews</Link>
                <Link href="/interviewer/feedback" className="py-5 px-3 text-white">Feedback</Link>
              </div>
            </div>
            {/* Secondary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/interviewer/profile" className="py-2 px-3 bg-blue-700 text-white rounded mr-2">Profile</Link>
        
            </div>
           
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavInterviewer;