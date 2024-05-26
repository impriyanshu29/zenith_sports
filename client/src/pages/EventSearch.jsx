import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowUpRightFromSquare, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

export default function EventSearch() {
  const [search, setSearch] = useState([]);
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const searchValue = url.get('searchEvent');
  const categoryValue = url.get('eventCategory');

  useEffect(() => {
    const fetchSearch = async () => {
      let url = '/api/event/getEvent?';
      if (!searchValue && !categoryValue) {
        setSearch([]);
        return;
      }

      if (searchValue) {
        url += `searchEvent=${searchValue}`;
      } else if (categoryValue) {
        url += `eventCategory=${categoryValue}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok && data.data) {
          setSearch(data.data);
        } else {
          console.error(data.error || 'Failed to fetch events');
          setSearch([]);
        }
      } catch (error) {
        console.error('Error fetching search:', error);
        setSearch([]);
      }
    };

    fetchSearch();
  }, [location.search]);

  console.log(
    search?.map((post) => post._id)
  );

  return (
    <>
      {search.length > 0 ? (
        <div className="grid mx-8 gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3 ">
          {search.map((post) => (
            <div
              key={post._id}
              className="border cursor-pointer dark:glass-container bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md"
            >
              <Link to={`/events/${post.slug}`}>
                <img
                  src={post.image}
                  className="h-[250px] w-full rounded-md"
                  alt=""
                />
                <div className="min-h-min p-3">
                  <Link to={`/search?category=${post.eventCategory}`}>
                    <p className="mt-4 hover:font-extrabold w-full text-xs font-subheading_font leading-tight font-semibold text-gray-600">
                      #{post.eventCategory}
                    </p>
                  </Link>
                  <p className="mt-4 flex-1 text-xl font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                    {post.eventName.slice(0, 32)}....
                  </p>
                  <p className="text-gray-600 w-full text-sm leading-normal">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `${post.description.slice(0, 90)}...`,
                      }}
                    />
                  </p>
                  <div className="mt-4 flex space-x-3">
                    <img
                      className="h-full w-10 rounded-lg"
                      src={post.adminImage}
                      alt={post.adminName}
                    />
                    <div>
                      <p className="text-sm font-heading_font text-[#27374D] dark:text-[#DDE6ED] leading-tight mb-1">
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
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <h1>No search results found</h1>
        </div>
      )}
    </>
  );
}
