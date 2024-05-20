"use client";

import { set } from "mongoose";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import{useNavigate} from 'react-router-dom'
import{useLocation} from 'react-router-dom'

function Blog() {
  const [posts, setPosts] = useState([]);
  const [fullPost, setFullPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      const urlParams =new URLSearchParams(location.search);
   
      urlParams.set('searchTerm', searchValue)
     
      const search = urlParams.toString()
      navigate(`/search?${search}`)
    } catch (error) {
      console.log("Error fetching search:", error);
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
      const res = await fetch(`/api/post/getpost?page=${currentPage}`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.message.post.posts);
        setFullPost(data.message.post);
      }
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-2 ">
        <div className="flex flex-col space-y-8 pb-10 pt-12 px-2 md:pt-24">
          <p className="text-center font-heading_font text-3xl text-[#27374D] dark:text-[#DDE6ED] md:text-5xl md:leading-10">
            Unveiling Knowledge: Dive Into{" "}
            <span className="text-sky-700 dark:text-sky-500"> Our Blog</span>
          </p>
          <p className="max-w-4xl mx-auto text-center text-base font-body_font   text-gray-600 md:text-xl">
            Whether it's football, basketball, cricket, or tennis, these blog
            page covers a wide range of sports, ensuring there's something for
            every sports fan to enjoy.
          </p>

          <form onSubmit={handleSearch}>
            <div className="mt-6 mx-auto flex w-full items-center space-x-2 md:w-1/3">
              <input
                className="flex h-10 w-full rounded-md border border-gray-500 text-gray-500 dark:bg-gray-300   bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={searchValue}
                placeholder="Search Topics"
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

        <div className="grid mx-8 gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3 ">
          {posts.map((post) => (
            <div
              key={post._id}
              className=" border cursor-pointer  dark:glass-container bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md"
            >
              <Link to={`/blog/${post.slug}`}>
                <img
                  src={post.image}
                  className=" h-[250px]  w-full rounded-md"
                  alt=""
                />
                <div className="min-h-min p-3">
                  <Link to={`/search?category=${post.category}`}>
                    <p className="mt-4 hover:font-extrabold w-full text-xs font-subheading_font  leading-tight font-semibold text-gray-600">
                      #{post.category}
                    </p>
                  </Link>
                  <p className="mt-4 flex-1 text-xl font-semibold  text-[#27374D] dark:text-[#DDE6ED]">
                    {post.title.slice(0, 32)}
                    {"...."}
                  </p>
                  <p className=" text-gray-600 w-full text-sm leading-normal ">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `${post.content.slice(0, 90)}...`,
                      }}
                    />
                  </p>
                  <div className="mt-4 flex space-x-3 ">
                    <img
                      className="h-full w-10 rounded-lg"
                      src={post.adminImage}
                    />
                    <div>
                      <p className="text-sm font-heading_font text-[#27374D] dark:text-[#DDE6ED]  leading-tight mb-1">
                        {post.adminName}
                      </p>
                      <p className="text-sm leading-tight text-gray-600">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full border-t border-gray-300">
          <div className="mt-2 flex items-center justify-between">
            <div className="hidden md:block text-gray-700">
              <p>
                showing <strong>1</strong> to <strong>6</strong> of{" "}
                <strong>{fullPost.totalPost}</strong> results
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

export default Blog;
