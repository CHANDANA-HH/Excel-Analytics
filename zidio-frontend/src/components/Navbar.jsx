import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_gx.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('firstName');
    if (storedName) setFirstName(storedName);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    navigate('/login');
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-md text-gray-800 relative z-50">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="GraphiXcel Logo" className="h-10 w-auto" />
          <div className="text-2xl font-bold text-indigo-700">GraphiXcel</div>
          {firstName && (
            <span className="ml-4 text-md font-semibold text-indigo-700">
              Welcome, {firstName}!
            </span>
          )}
        </div>

        {/* Nav Links */}
        <ul className="flex gap-8 items-center text-gray-600 font-medium text-md">
          <Link to="/" className="hover:text-indigo-700">HOME</Link>
          <a href="#about" className="hover:text-indigo-600">ABOUT US</a>
          <Link to="/upload" className="hover:text-indigo-600">UPLOAD EXCEL</Link>
          <a href="#contact" className="hover:text-indigo-600">CONTACT US</a>

          {firstName && (
            <div className="text-3xl cursor-pointer" onClick={() => setShowSidebar(true)}>
              ☰
            </div>
          )}

          {!firstName && (
            <li><Link to="/login" className="hover:text-indigo-600">LOGIN</Link></li>
          )}
        </ul>
      </nav>

      {/* Sidebar + Backdrop */}
      {showSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 z-50 transition-transform duration-300">
            <button onClick={() => setShowSidebar(false)} className="mb-6 text-gray-600 text-2xl hover:text-indigo-600">←</button>
            


            <div className="space-y-6 text-lg">
              <div onClick={() => { navigate('/history'); setShowSidebar(false); }} className="cursor-pointer hover:text-indigo-600">
                 History
              </div>
              <div onClick={() => { navigate('/downloaded-charts'); setShowSidebar(false); }} className="cursor-pointer hover:text-indigo-600">
                Downloaded Charts
              </div>
            </div>

            

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="block w-full text-left mt-6 text-red-600 hover:underline"
            >
               Logout / Sign out
            </button>
          </div>
        </>
      )}

      {/* Custom Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Are you sure you want to logout?</h2>
            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={() => { handleLogout(); setShowLogoutConfirm(false); }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
