import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../../src/glass.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";

function UpdatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [fullpostList, setfullpostList] = useState([]);
  const [postList, setpostList] = useState([]);
  const [showMore, setshowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [postIdDelete, setpostIdDelete] = useState('')
 
  useEffect(() => {
    const fetchposts = async () => {
      try {
        const res = await fetch(
          `/api/post/getpost`
        );
        const data = await res.json();

        if (res.ok) {
          setpostList(data.message.post.posts);
          setfullpostList(data.message.post);
          if (data.message.post.totalPost < 7) {
            setshowMore(false);
          }
        }
      } catch (error) {
        console.log("====================================");
        console.log(Error);
        console.log("====================================");
      }
    };
    if (currentUser.message.user.isAdmin) {
      fetchposts();
    } 
  }, [currentUser.message.user._id, currentUser.message.user.isAdmin]); 


  const handleShowMore = async () => {
    const startIndex = postList.length;
    try {
      const res = await fetch(
        `/api/post/getpost?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setpostList((prev) => [...prev, ...data.message.post.posts]);
        if (data.message.post.posts.length < 7) setshowMore(false);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const handleDeletePost = async() => {
    setShowModel(false);
  }
  const handleConfirmDelete = async()=>{
    setShowModel(false)
   
    try {
        const res = await fetch (`/api/post/deletePost/${postIdDelete}/${currentUser.message.user._id}`,
        {
            method :'DELETE'
        });

        const data = await res.json();

        if(!res.ok){
            console.log(data.error);
        }
        else{
            setpostList((prev) => prev.filter((post) => post._id !== postIdDelete))
        }
    } catch (error) {
        console.log(error);
        
    }
  }
  const handleCancel = async () =>{
setShowModel(false)
  }

  return (
    <>
      {currentUser.message.user.isAdmin && fullpostList.totalPost > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-4 py-4 ">
          <div className=" flex flex-col bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-600 md:rounded-lg ">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-100 dark:glass-container dark:bg-[#131315] ">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-md font-heading_font  dark:text-gray-200 text-gray-700"
                        >
                          <span>Posts</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left  text-md font-heading_font  dark:text-gray-200 text-gray-700"
                        >
                          Title
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-md font-heading_font   dark:text-gray-200 text-gray-700"
                        >
                          Category
                        </th>

                        <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Delete</span>
                        </th>

                        <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-[#131315] dark:glass-container   bg-gray-100 dark:bg-[#131315] ">
                      {postList.map((post) => (
                        <tr key={post._id}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-14 w-14 flex-shrink-0">
                                <Link to={`/blog/${post.slug}`}>
                                  <img
                                    className="h-14 w-14 rounded-md  object-cover"
                                    src={post.image}
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div className="ml-6">
                                <div className="text-sm font-sub_heading   text-gray-900 dark:text-gray-100">
                                  {new Date(
                                    post.updatedAt
                                  ).toLocaleDateString()}
                                </div>
                                {/* <div className="text-sm text-gray-700">{person.email}</div> */}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <Link to={`/blog/${post.slug}`}>
                              <div className="text-sm font-sub_heading   text-gray-900 dark:text-gray-100 ">
                                {post.title.slice(0, 30)}{"..."}
                              </div>
                            </Link>
                            {/* <div className="text-sm text-gray-700">{person.department}</div> */}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 font-sub_heading  text-sm text-gray-700 dark:text-gray-100">
                            {post.category}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 font-sub_heading   text-right text-sm font-medium">
                            <span
                              onClick={() => {setShowModel(true);setpostIdDelete(post._id)}}
                              className=" cursor-pointer hover:underline text-red-700"
                            >
                              Delete
                            </span>
                          </td>
                          
                          <Modal
                            show={showModel}
                            onClose={handleCancel}
                            onConfirm={handleDeletePost}
                            popup
                            size="sm"
                          >
                            
                            <div className="p-6">
                              <p className="text-lg font-body_font mb-4 text-[#27374D] dark:text-[#DDE6ED]">
                                Are you sure that you want to delete these post ??
                              </p>
                              <div className="flex justify-end">
                                <Button
                                  onClick={handleCancel}
                                  className="text-gray-200 dark:bg-gray-700 dark:text-gray-200 border bg-[#27374D] border-none border-[#27374D] dark:border-[#DDE6ED] hover:bg-black hover:text-white mr-2"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleConfirmDelete}
                                  className="bg-red-500 dark:bg-red-700 dark:text-gray-200 hover:bg-red-600"
                                >
                                  Confirm
                                </Button>
                              </div>
                            </div>
                          </Modal>
                          <td className="whitespace-nowrap px-4 py-4 font-sub_heading   text-right text-sm font-medium">
                            <Link
                              to={`/dashboard?tab=edit_post-${post._id}`}
                              className="cursor-pointer text-green-700 "
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {showMore && (
                    <div className="flex justify-center mt-3 mb-3">
                      <button
                        onClick={handleShowMore}
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center m-auto h-screen">
          <p className="text-gray-500 text-lg">
            <span className="font-bold">Oops!</span> You don't have any posts.
          </p>
        </div>
      )}
    </>
  );
}

export default UpdatePost;
