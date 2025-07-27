import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40 lg:hidden"
          onClick={closeSidebar}></div>
      )}

      {/* Sidebar for mobile/tablet */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="text-xl font-bold" onClick={closeSidebar}>
              PayGasm
            </Link>
            <button className="btn btn-ghost btn-sm" onClick={closeSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul className="menu p-0 space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="btn btn-ghost justify-start w-full"
                onClick={closeSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                  />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/redirect"
                className="btn btn-ghost justify-start w-full"
                onClick={closeSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                Redirect
              </Link>
            </li>
            <li>
              <Link
                to="/payment"
                className="btn btn-ghost justify-start w-full"
                onClick={closeSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Payment
              </Link>
            </li>
          </ul>

          <div className="mt-8">
            <button className="btn btn-error w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          {/* Mobile hamburger button */}
          <button className="btn btn-ghost lg:hidden" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <Link to="/" className="btn btn-ghost text-xl">
            PayGasm
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link to="/dashboard" className="btn btn-ghost">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/redirect" className="btn btn-ghost">
                Redirect
              </Link>
            </li>
            <li>
              <Link to="/payment" className="btn btn-ghost">
                Payment
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <button className="btn btn-error">Logout</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
