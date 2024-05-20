import { set } from "mongoose";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Family() {
  const [posts, setPosts] = useState([]);
  const [fullPost, setFullPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const[searchValue,setSearchValue] = useState("")
  const navigate = useNavigate();

const handleSearch = (e) =>{
  e.preventDefault();
  try {
    console.log('====================================');
    console.log(searchValue);
    console.log('====================================');
    const urlParams =new URLSearchParams(location.search);
    console.log(urlParams)
      urlParams.set('searchAlumni', searchValue)
     
      const search = urlParams.toString()
      navigate(`/search?${search}`)
  } catch (error) {
    console.log(error)
  }
}

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/alumni/getalumni?page=${currentPage}`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.message.alumni.alumnis);
        setFullPost(data.message.alumni);
      }
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-2 ">
        <div className="flex flex-col space-y-8 pb-10 pt-12 px-2 md:pt-24">
          
          
          <p className="text-center font-heading_font text-3xl text-[#27374D] dark:text-[#DDE6ED] md:text-5xl md:leading-10">
          Proud Past, Bright Futures :  <span className="text-sky-700 dark:text-sky-500">  Alumni Showcase</span> 
</p>
          
          <p className="max-w-4xl mx-auto text-center text-base font-body_font   text-gray-600 md:text-xl">
            Discover the remarkable journeys of our esteemed alumni, showcasing
            their triumphs on the football field and beyond, as they excel in
            their careers with renowned companies.
          </p>
          <form onSubmit={handleSearch}>
            <div className="mt-6 mx-auto flex w-full items-center space-x-2 md:w-1/3">
              <input
                className="flex h-10 w-full rounded-md border border-gray-500 text-gray-500 dark:bg-gray-300   bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={searchValue}
                placeholder="Search Alumni"
                onChange={(e) => setSearchValue(e.target.value)}
              ></input>
              <button
                type="submit"
                className="rounded-md bg-sky-700 dark:bg-sky-600 dark:text-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
          <div className="flex w-full items-end border-b border-gray-300">
            {['Design', 'Product', 'Software Engineering', 'Customer Success'].map(
              (filter, index) => (
                <div
                  className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
                  key={filter}
                >
                  {filter}
                </div>
              )
            )}
          </div>
        </div> */}
        {/* posts */}

        <div className="grid   gap-1 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3 ">
          {posts.map((post) => (
            <div key={post._id} className="w-[320px] mx-auto border cursor-pointer  dark:glass-container bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md">
              <img
                src={post.image}
                alt={post.firstname}
                className="h-[290px] rounded-md w-full  rounded-t-md object-fill "
              />
              <div className="p-4">
                <Link to={`/alumni/${post.slug}`}>
                  <h1 className="inline-flex items-center text-gray-700 dark:text-gray-200 text-lg font-semibold">
                    About {post.firstname}&nbsp; <FaArrowUpRightFromSquare />
                  </h1>
                </Link>
                <p className="mt-3 text-sm text-gray-600">{(post.about).slice(0,60)}{"..."}</p>
                <div className="mt-4 flex flex-row gap-1 ">
                  <Link to={post.instagram}>
                    <span className="flex items-center mb-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700   px-3 py-1 text-xs font-semibold ">
                      <FaInstagram className="mr-1" />
                      Instagram
                    </span>
                  </Link>
                  <Link to={post.linkedin}>
                    <span className="flex items-center mb-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700    px-3 py-1 text-xs font-semibold ">
                      <FaLinkedinIn className="mr-1" />
                      Linkedin
                    </span>
                  </Link>
                  <Link to ={`/search?batch=${post.batch}`}>
                  <span className="flex items-center mb-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700    px-3 py-1 text-xs font-semibold ">
                    {post.batch}
                  </span>
                  </Link>
                </div>

              <Link to={`/alumni/${post.slug}`}>
                <button
                  type="button"
                  className="mt-4 w-full rounded-sm  bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Know More
                </button>
              </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full border-t border-gray-300">
          <div className="mt-2 flex items-center justify-between">
            <div className="hidden md:block text-gray-700">
              <p>
                showing <strong>1</strong> to <strong>6</strong> of{" "}
                <strong>{fullPost.totalAlumni}</strong> results
              </p>
            </div>
            <div className="space-x-2">
              <button
                type="button"
                onClick={handlePreviousPage}
                className="rounded-md bg-black px-3 py-2 text-base font-body_font text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                className="rounded-md bg-black px-3 py-2 text-base font-body_font text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Family;
