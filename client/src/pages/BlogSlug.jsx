import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
function BlogSlug() {
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blogSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getpost?slug=${blogSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(true);
        }
        if (res.ok) {
          setPost(data.message.post.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [blogSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="mt-8 lg:mt-14 text-[#27374D] dark:text-[#DDE6ED] p-3 text-center font-heading_font max-w-2xl text-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>

      <img
        src={post.image}
        alt={post.title}
        className="w-full max-h-[600px] object-cover rounded-lg mt-4"
      />

      <Link
        to={`/search?category=${post.category}`}
        className="self-center mt-4"
      >
        <p className="mt-4  hover:font-extrabold w-full text-xs font-subheading_font  leading-tight font-semibold text-gray-600">
          #{post.category}
        </p>
      </Link>

      

      <div className="p-3 max-w-3xl mx-auto w-full ">
      <p className="content-of-post text-[#27374D] dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `${post.content}` }} />
            
      </div>

      <div className="flex mt-4  text-sm items-center justify-center space-x-2 text-gray-600">
        <span className="font-semibold text-sm font-body_font text-gray-700 dark:text-gray-200">
          Written By:
        </span>
        <span className="text-gray-600 text-sm font-subheading_font">
          {post.adminName}
        </span>
        <span className=" text-gray-800 text-sm dark:text-gray-200">on</span>
        <span className="text-gray-600  text-sm font-subheading_font">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
    </main>
  );
}

export default BlogSlug;
