import React, { useState, useEffect } from "react";
import { HiOutlineViewList } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";

// Breadcrumb Component
const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="breadcrumb mt-4 mb-2">
      <ul className="flex items-center text-sm text-gray-600 space-x-2">
        {/* <li>
          <Link to="/" className="hover:text-blue-600 text-2xl font-semibold">
            Home
          </Link>
        </li> */}
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-500 text-2xl font-semibold text-blue capitalize">
                  {segment}
                </span>
              ) : (
                <Link
                  to={path}
                  className="hover:text-blue-600 text-2xl font-semibold capitalize"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const Layout = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [showSidebar, setShowSidebar] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const topBarTabs = [
    { label: "Dashboard", path: "dashboard", icon: MdSpaceDashboard },
    { label: "Notifications", path: "notifications", icon: MdNotificationsActive },

    { label: "Events", path: "events", icon: MdEmojiEvents },
    { label: "Events", path: "events", icon: MdEmojiEvents  },
    { label: "Users", path: "users", icon: FaUser  },



  ];

  const location = useLocation();

  // Utility function to check active tab
  const isActive = (path) => location.pathname.includes(path);

  // Handle responsive sidebar toggle
  const handleWidth = () => {
    setWidth(window.innerWidth);
    setShowSidebar(window.innerWidth < 768);
  };

  // Fetch student data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("studentData");
    if (storedData) {
      setStudent(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, []);

  // Show loading state if data is being fetched
  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="w-full fixed top-0 flex items-center justify-between h-[60px] z-[2] shadow bg-white">
        <div className="flex items-center">
          <HiOutlineViewList
            className="text-2xl mx-3 block md:hidden cursor-pointer"
            onClick={() => setShowSidebar(!showSidebar)}
          />
          <Link to="/" className="logo select-none font-semibold px-3 text-2xl">
            Teckzite@2k25
          </Link>
        </div>
        <div className="flex items-center text-zinc-950">
          <div className="tab cursor-pointer font-semibold mx-[20px] px-4 py-1 flex items-center rounded-full md:shadow-lg md:border">
            <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
              {student ? (
                <img
                  src={`https://intranet.rguktn.ac.in/SMS/usrphotos/user/${student?.student?.studentId}.jpg`}
                  alt={student?.student?.studentName}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-full"></div>
              )}
            </div>
            <div className="hidden mx-2 md:inline-block">
              {student?.student?.studentName || "Guest"}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar shadow fixed md:hidden w-full z-[3] top-0 ${
          showSidebar ? "left-0" : "-left-full"
        } duration-500 h-screen bg-white flex flex-col`}
      >
        <div className="w-full flex items-center justify-end p-3">
          <VscChromeClose
            className="text-[30px] cursor-pointer"
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </div>
        <div className="flex flex-col md:gap-4">
          {topBarTabs.map((item, index) => (
            <Link
              key={index}
              to={`/${item.path}`}
              onClick={() => setShowSidebar(false)}
              className={`tab-heading w-[97%] mx-auto px-4 py-2 mt-2 text-lg font-bold flex items-center ${
                isActive(item.path) ? "text-blue-600" : "hover:text-blue-500"
              }`}
            >
              <item.icon className="mr-2" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            className="w-[90%] py-2 mx-auto bg-black text-white rounded-md flex items-center justify-center gap-2 mt-10"
            onClick={() => {
              localStorage.removeItem("studentData");
              window.location.reload();
            }}
          >
            Logout
            <IoLogInOutline />
          </button>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row mt-[60px] h-[calc(100vh-60px)]">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-col w-[240px] border-r h-full">
          {topBarTabs.map((item, index) => (
            <Link
              key={index}
              to={`/${item.path}`}
              className={`tab-heading px-4 py-2 text-lg mt-[3px] w-[92%] mx-auto font-semibold flex items-center rounded-md ${
                isActive(item.path)
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <item.icon className="mr-2" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            className="w-[90%] py-2 mx-auto bg-black text-white rounded-md flex items-center justify-center gap-2 mt-10"
            onClick={() => {
              localStorage.removeItem("studentData");
              window.location.reload();
            }}
          >
            Logout
            <IoLogInOutline />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
