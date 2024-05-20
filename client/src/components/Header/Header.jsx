import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../redux/function/themeSlice";
import { IoSunnySharp } from "react-icons/io5";
import { signOutSucess } from "../../redux/function/userSlice";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { currentTheme } = useSelector((state) => state.theme);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("")
  const  [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = React.useState(false);
const location = useLocation()
const navigate = useNavigate()

  

  const handleSearchResult = (e) => {
    e.preventDefault()

   
    const urlParams =new URLSearchParams(location.search);
   
    urlParams.set('searchTerm', searchTerm)
    //eg: /search?searchTerm=hello
    const searchValue = urlParams.toString()
    navigate(`/search?${searchValue}`)
  }


  const menuItems = [
    {
      name: "HOME",
      href: "/",
    },
    {
      name: "BLOG",
      href: "/blog",
    },
    {
      name: "ABOUT",
      href: "/about",
    },
    {
      name: "FAMILY",
      href: "/family",
    },
    {
      name: "ACHIEVMENTS",
      href: "/achievements",
    },

  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/auth/logout`, {
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
  const handleTheme = () => {
    console.log("Theme Changed!");
    dispatch(changeTheme());
  };

  return (
    
    <div className="relative w-full bg-gray-50 dark:bg-neutral-950 ">
      <div className="mx-auto flex max-w-7xl items-center justify-between  px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2 ">
          <Link
            to="/"
            className={`whitespace-nowrap self-center font-logo_font text-[#BFCDD9] text-sm sm:text-xl font-semibold`}
          >
            <span className="px-2 py-1  dark:bg-[#364559] bg-[#27374D] text-[#DDE6ED] rounded-lg">
              AKGEC
            </span>
            -FC
          </Link>
        </div>
        <div className="hidden grow items-end lg:flex justify-center">
          <ul className="ml-12 inline-flex space-x-8 ">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="inline-flex items-end  text-md  text-left dark:text-[#BFCDD9] text-gray-900 font-heading_font hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSearchResult} className="ml-4 flex justify-center">
  <fieldset>
    <label htmlFor="searchInput" className="sr-only">Search</label>
    <input
      id="searchInput"
      className="flex h-10 w-32 md:w-2/4 lg:w-3/4 rounded-md dark:bg-gray-200 bg-gray-700 px-3 py-2 text-sm dark:placeholder:text-gray-700 placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      type="text"
      value={searchTerm}
      placeholder="Search..."
      
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    
  </fieldset>
</form>

        <div className=" flex gap-3 space-x-2 ">
          <div className="">
          
            <Button
              className="w-12 h-12 m-2  dark:hover:bg-gray-800 hover:bg-gray-200 hidden dark:text-gray-200 hover:text-gray-700  sm:inline"
              color="#F5F5F"
              onClick={handleTheme}
            >
              {currentTheme === "dark" ? <FaMoon /> : <IoSunnySharp />}
            </Button>
          </div>
          <div>
            {currentUser ? (
              <div className="relative inline-block">
                <img
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="h-12 m-2 w-12 rounded-full border border-gray-200 dark:border-gray-900 cursor-pointer"
                  src={currentUser.message.user.coverImage}
                  alt="User_Profile"
                />
                {showDropdown && (
                  <div className="absolute top-14 right-0 z-10 bg-gray-200  mt-2 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-md space-y-2">
                    <div className="flex gap-6 rounded-md w-auto bg-gray-700  dark:bg-gray-800 p-6 text-gray-200 items-center">
                      <div className=" h-12 w-12 rounded-full mr-2">
                        <img
                          alt="User"
                          src={currentUser.message.user.coverImage}
                          className="h-12 w-12 rounded-full mr-2"
                        />
                      </div>
                      <div>
                        <span className="block text-lg font-bold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">
                          {currentUser.message.user.username}
                        </span>
                        <span className="block text-sm">
                          {currentUser.message.user.email}
                        </span>
                      </div>
                    </div>
                    <Link to="/dashboard?tab=profile">
                      <div
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="hover:bg-gray-300 hover:text-gray-800 p-4 cursor-pointer"
                      >
                        Profile
                      </div>
                    </Link>

                    {currentUser.message.user.isAdmin && (
                      <Link to="/dashboard?tab=updatepost">
                        <div
                          onClick={() => setShowDropdown(!showDropdown)}
                          className="hover:bg-gray-300 border-t dark:border-gray-600 border-gray-300 hover:text-gray-800 p-4 cursor-pointer"
                        >
                          Post
                        </div>
                      </Link>
                    )}

                    <div
                      onClick={handleLogout}
                      className="hover:bg-gray-300 hover:text-red-500 p-4 dark:border-gray-600  border-t border-gray-300 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
              <button
                type="button"
                className="rounded-md  bg-transparent px-3 my-4 py-2 dark:text-gray-200 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Sign In
              </button>
              </Link>
            )}
          </div>
        </div>

        <div className="lg:hidden dark:text-[#DDE6ED]">
          <IoMdMenu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-gray-200 dark:bg-neutral-900 shadow-xl ring-1  ring-black  ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link
                      to="/"
                      className={`whitespace-nowrap self-center font-logo_font text-[#BFCDD9] text-sm sm:text-xl font-semibold`}
                    >
                      <span className="px-2 py-1  dark:bg-[#364559] bg-[#27374D] text-[#DDE6ED] rounded-lg">
                        AKGEC
                      </span>
                      -FC
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <RxCross2 className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-heading_font   dark:text-[#65768C] text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}

                   <button
                                           className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                    onClick={handleTheme}
                   >
                                            <span className="ml-3 text-base font-heading_font   dark:text-[#65768C] text-gray-900">
                                            {currentTheme === "dark" ? "DARK-THEME" : "LIGHT-THEME"}
                                            </span>
              
                   </button>
                  </nav>
                </div>

               <div className="mt-4">
               {currentUser ? (
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Sign Out
                  </button>
                ) : (
                  <div className=" space-y-2">
                  
                    <Link 
                      to="/signin"
                    >
                        <button
                        onClick={() => setIsMenuOpen(false)}
                      type="button"
                      className="w-full mb-4 rounded-md border dark:bg-gray-200  border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Sign In
                    </button>
                    </Link>
                    <Link 
                      to="/signup">

                    
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      type="button"
                      className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Sign Up
                    </button>
                    </Link>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

("use client");
