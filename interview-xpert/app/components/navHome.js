import Link from 'next/link';

const NavHome = () => {
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
                <a href="#" className="py-5 px-3 text-white">Home</a>
                <a href="#" className="py-5 px-3 text-white">Contact</a>
              </div>
            </div>
            {/* Secondary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="py-2 px-3 bg-blue-700 text-white rounded mr-2">Login</Link>
              
              <Link href="/signup" className="py-2 px-3 bg-blue-700 text-white rounded">Sign Up</Link>
            </div>
           
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavHome;
  