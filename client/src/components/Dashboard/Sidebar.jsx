import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { set } from "mongoose";
import { signOutSucess } from "../../redux/function/userSlice";
import { useDispatch } from "react-redux";
import { GiPodiumWinner } from "react-icons/gi";
import { PiNotebookFill } from "react-icons/pi";
import { IoSchoolSharp } from "react-icons/io5";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

import { FaMedal } from "react-icons/fa";
import { GiMedallist } from "react-icons/gi";


import { FaPencilRuler } from "react-icons/fa";

import "../../../src/glass.css";
import { GiBabyfootPlayers } from "react-icons/gi";

function Sidebar() {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [pathName, setPathName] = useState("");
  const [alumnishowDropDown, setalumniShowDropdown] = useState(false);
const[showDropDown,setShowDropdown] = useState(false)
const[showDropDownAchievements,setShowDropdownAchievements] = useState(false)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const pathName = location.pathname;
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    setPathName(pathName);
  }, [location.search]);

  const handleLogout = async () => {
    try {
      console.log("Logging out");
      const res = await fetch('/api/auth/logout', {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSucess());
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <aside
      className={`dark:glass-container flex md:h-screen h-auto  shadow-md  bg-gray-100 font-body_font  rounded-xl dark:bg-[#131314] dark:text-[#65768C]  w-full md:w-64 flex-col overflow-y-auto  px-5 py-8 ${
        currentTheme === "dark" ? "scrollbar-dark" : ""
      }`}
    >
      <style>
        {`
          .scrollbar-dark::-webkit-scrollbar {
            width: 10px;
          }

          .scrollbar-dark::-webkit-scrollbar-thumb {
            background-color: #4a5568;
            border-radius: 5px;
          }

          .scrollbar-dark::-webkit-scrollbar-track {
            background-color: #1a202c;
            border-radius: 5px;
          }
        `}
      </style>

      <div className="mt-6 text-center md:text-left flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            <label className="px-3 text-center  text-xs font-semibold uppercase dark:text-[#BFCDD9] text-gray-900">
              Dashboard
            </label>

            <NavLink
              // also update in dashboard.jsx
              to="/dashboard?tab=profile"
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                tab === "profile" ? "bg-gray-200 text-gray-800" : ""
              }`}
            >
              <FaUser className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Profile</span>
            </NavLink>

            <div className={`flex transform  cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                pathName === "/signin" ? "bg-gray-200 text-gray-800" : ""
              }`} onClick={handleLogout} >
              <FaSignOutAlt className="h-5 w-5" aria-hidden="true" />
              <button  className="mx-2 text-sm font-medium">
                Sign Out
              </button>
              </div>
          </div>

          <div
            className={` ${
              currentUser.message.user.isAdmin
                ? " space-y-3"
                : "hidden md:block space-y-3"
            }`}
          >
            <label className="px-3 text-xs font-semibold uppercase dark:text-[#BFCDD9]  text-gray-900">
              {currentUser.message.user.isAdmin ?"Tools":"Content"}
            </label>

            {/* ........................................................................................................................................... */}
            {currentUser.message.user.isAdmin ? (
              <div className="mx-4 flex flex-col gap-2">
                <button
                  className="flex font-heading_font  items-center cursor-pointer"
                  onClick={() => setShowDropdown(!showDropDown)}
                >
                  <PiNotebookFill
                    className="h-5 w-5 inline-block "
                    aria-hidden="true"
                  />
                  <h1 className="ml-2 text-gray-600 ">Post</h1>
                  <IoIosArrowDropdownCircle
                    className="h-5 w-5 ml-2"
                    aria-hidden="true"
                  />
                </button>
                {showDropDown && (
                  <div className="pl-8">
                    <NavLink
                      to="/dashboard?tab=createpost"
                      className={`flex transform items-center rounded-lg gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                        tab === "createpost" ? "bg-gray-200 text-gray-800" : ""
                      }`}
                    >
                      <FaBookReader className="h-4 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">Create Post</span>
                    </NavLink>
                    <NavLink
                      to="/dashboard?tab=updatepost"
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                        tab === "updatepost" ? "bg-gray-200 text-gray-800" : ""
                      }`}
                    >
                      <FaPencilRuler className="h-4 w-5" aria-hidden="true" />
                      <span className="mx-2 text-sm font-medium">
                        {" "}
                        Update Post
                      </span>
                    </NavLink>
                  </div>
                )}
              </div>
            ) : null}

            {/*............................... ......................................................................................................................................... */}
            {currentUser.message.user.isAdmin ? (
              <div className="mx-4 py-2 flex flex-col gap-2">
                <button
                  className="flex font-heading_font  items-center cursor-pointer"
                  onClick={() => setalumniShowDropdown(!alumnishowDropDown)}
                >
                  <GiPodiumWinner
                    className="h-5 w-5 inline-block "
                    aria-hidden="true"
                  />
                  <h1 className="ml-2 text-gray-600 ">Alumni</h1>
                  <IoIosArrowDropdownCircle
                    className="h-5 w-5 ml-2"
                    aria-hidden="true"
                  />
                </button>
                {alumnishowDropDown && (
                  <div className="pl-8">
                    <NavLink
                      to="/dashboard?tab=createAlumni"
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                        tab === "createAlumni"
                          ? "bg-gray-200 text-gray-800"
                          : ""
                      }`}
                    >
                      <IoSchoolSharp className="h-4 w-5" aria-hidden="true" />
                      <span className="mx-2 text-sm font-medium"> Create Alumni</span>
                    </NavLink>

                    <NavLink
                      to="/dashboard?tab=updatealumni"
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                        tab === "updatealumni"
                          ? "bg-gray-200 text-gray-800"
                          : ""
                      }`}
                    >
                      <FaPencilRuler className="h-4 w-5" aria-hidden="true" />
                      <span className="mx-2 text-sm font-medium">
                        {" "}
                        Update Alumni
                      </span>
                    </NavLink>
                  </div>
                )}
              </div>
            ) : null}

          {currentUser.message.user.isAdmin ? (
              <div className="mx-4 flex flex-col gap-2">
                <button
                  className="flex font-heading_font  items-center cursor-pointer"
                  onClick={() => setShowDropdownAchievements(!showDropDownAchievements)}
                >
                  <GiMedallist
                    className="h-5 w-5 inline-block "
                    aria-hidden="true"
                  />
                  <h1 className="ml-2 text-gray-600 ">Achievements</h1>
                  <IoIosArrowDropdownCircle
                    className="h-5 w-5 ml-2"
                    aria-hidden="true"
                  />
                </button>
                {showDropDownAchievements && (
                  <div className="pl-8">
                    <NavLink
                      to="/dashboard?tab=createAchievements"
                      className={`flex transform items-center rounded-lg gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                        tab === "createAchievements" ? "bg-gray-200 text-gray-800" : ""
                      }`}
                    >
                      <FaMedal className="h-4 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">Create Achievementst</span>
                    </NavLink>
                    <NavLink
                      to="/dashboard?tab=updateAchievements"
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                        tab === "updateAcievements" ? "bg-gray-200 text-gray-800" : ""
                      }`}
                    >
                      <FaPencilRuler className="h-4 w-5" aria-hidden="true" />
                      <span className="mx-2 text-sm font-medium">
                        {" "}
                        Update Achievements
                      </span>
                    </NavLink>
                  </div>
                )}
              </div>
            ) : null}


            {currentUser.message.user.isAdmin && (
               <NavLink
               to="/dashboard?tab=userlist"
               className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                tab === "userlist"
                  ? "bg-gray-200 text-gray-800"
                  : ""
               }`}
             >
               <IoIosPeople className="h-5 w-5 font-bold text-lg " aria-hidden="true" />
               <span className="mx-3 text-base font-heading_font ">Members</span>
             </NavLink>
            )}
            {!currentUser.message.user.isAdmin && (
              <NavLink
                to="/"
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                  pathName === "/" ? "bg-gray-200 text-gray-800" : ""
                }`}
              >
                <FaHome className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Home</span>
              </NavLink>
            )}
            {!currentUser.message.user.isAdmin && (
              <NavLink
                to="/about"
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                  pathName === "/about" ? "bg-gray-200 text-gray-800" : ""
                }`}
              >
                <FaBox className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">About</span>
              </NavLink>
            )}

            {!currentUser.message.user.isAdmin && (
              <NavLink
                to="/family"
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                  pathName === "/family" ? "bg-gray-200 text-gray-800" : ""
                }`}
              >
                <GiBabyfootPlayers className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Family</span>
              </NavLink>
            )}

            {!currentUser.message.user.isAdmin && (
              <NavLink
                to="/achievements"
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                  pathName === "/achievements"
                    ? "bg-gray-200 text-gray-800"
                    : ""
                }`}
              >
                <GiPodiumWinner className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Achievements</span>
              </NavLink>
            )}

            {!currentUser.message.user.isAdmin && (
              <NavLink
                to="/blog"
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:underline ${
                  pathName === "/blog" ? "bg-gray-200 text-gray-800" : ""
                }`}
              >
                <FaBookReader className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Blogs</span>
              </NavLink>
            )}
          </div>
        </nav>
        <div className="hidden md:block mt-6">
          <div className="mt-6 ">
            <NavLink
              to="/dashboard?tab=profile"
              className="flex items-center gap-x-2 "
            >
              <img
                className="h-7 w-7 rounded-full object-cover"
                src={currentUser.message.user.coverImage}
                alt="avatar"
              />
              <span className="text-sm dark:text-[#65768C] dark:hover:text-[#BFCDD9] font-medium text-gray-700">
                {currentUser.message.user.username}
              </span>
              <div className="text-sm font-medium dark:text-gray-700 dark:bg-gray-200 bg-[#27374D] text-[#DDE6ED] rounded-lg px-2 py-2 ">
                <span className="dark:text-[#65768C] dark:hover:text-[#BFCDD9]">
                  {currentUser.message.user.isAdmin ? "Admin" : "User"}
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
