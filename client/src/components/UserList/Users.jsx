import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../../src/glass.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { set } from "mongoose";

function UserList() {
  const { currentUser } = useSelector((state) => state.user);
  const [fullAlumniList, setfullAlumniList] = useState([]);
  const [userList, setuserList] = useState([]);
  const [fullUser,setFullUser] = useState([])
  const [showMore, setshowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [AlumniIdDelete, setAlumniIdDelete] = useState("");
  const[errorMessages,setErrorMessages] = useState(null)
  const [successMessages,setSuccessMessages] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/list/getUserList");
        const data = await res.json();

        if (res.ok) {
          setuserList(data.message.users.users);
          setFullUser(data.message.users.totalUsers);
        }
      } catch (error) {
        console.log("====================================");
        console.log(Error);
        console.log("====================================");
      }
    };

    if (currentUser.message.user.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.message.user.isAdmin]);

  const handleAdminStatusChange = async (userId) => {
    try {
     
        const res = await fetch(`/api/list/updateAdmin/${userId}`, {
            method: "PUT",
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            // Assuming data.isAdmin holds the new isAdmin status
            setuserList((prev) =>
                prev.map((user) =>
                    user._id === userId ? { ...user, isAdmin : data.message.user.isAdmin } : user,
                    
                )
            );
          setSuccessMessages(data.status)
          setTimeout(() => {
            setSuccessMessages(null);
          }, 4000);
          
        } else {
            setErrorMessages(data.error);
            setTimeout(() => {
              setErrorMessages(null);
            }, 4000);
        }
    } catch (error) {
       setErrorMessages(error.message);
       setTimeout(() => {
        setErrorMessages(null);
      }, 4000);
    }
};

  const handleShowMore = async () => {
    const startIndex = userList.length;
    try {
      const res = await fetch(
        `/api/list/getUserList?startIndex=${startIndex}`
      );
      const data = await res.json();
      
    
      if (res.ok) {
        if (data.message.users.users.length < 6) {
          setshowMore(false);
        }
        setuserList((prev) => [...prev, ...data.message.users.users]);
       
      }
    } catch (error) {
      console.log(error)
      setErrorMessages(error.message);
      setTimeout(() => {
        setErrorMessages(null);
      }, 4000);
      
    }
  };

  const handleDeletePost = async () => {
    setShowModel(false);
  };
  const handleConfirmDelete = async (userIdDelete) => {
    setShowModel(false);

    try {
      const res = await fetch(
        `/api/list/deleteUser/${userIdDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
        setErrorMessages(data.error);
        setTimeout(() => {
          setErrorMessages(null);
        }, 4000);
        
      } else {
        setuserList((prev) =>
          prev.filter((post) => post._id !== userIdDelete)
        );
        setErrorMessages(data.message);
        setTimeout(() => {
          setErrorMessages(null);
        }, 4000);
      }
    } catch (error) {
      setErrorMessages(error.message);
      setTimeout(() => {
        setErrorMessages(null);
      }, 4000);
    }
  };
  const handleCancel = async () => {
    setShowModel(false);
  };

  return (
    <>
      {currentUser.message.user.isAdmin && fullUser > 0 ? (
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
                          <span>Members</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left  text-md font-heading_font  dark:text-gray-200 text-gray-700"
                        >
                          CreatedAt
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-md font-heading_font   dark:text-gray-200 text-gray-700"
                        >
                          Admin
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
                      {userList.map((users) => (
                        <tr key={users._id}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-14 w-14 flex-shrink-0">
                                <img
                                  className="h-14 w-14 rounded-md  object-cover"
                                  src={users.coverImage}
                                  alt=""
                                />
                              </div>
                              <div className="ml-6">
                                <div className="text-sm font-sub_heading   text-gray-900 dark:text-gray-100">
                                  {users.username}
                                </div>

                                <div className="text-sm text-gray-700">
                                  {users.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm font-sub_heading   text-gray-900 dark:text-gray-100 ">
                              {new Date(
                                    users.createdAt
                                  ).toLocaleDateString()}
                            </div>

                            {/* <div className="text-sm text-gray-700">{person.department}</div> */}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 cursor-pointer font-sub_heading text-sm text-gray-700 dark:text-gray-100">
                            <span
                              onClick={() =>
                                handleAdminStatusChange(
                                  users._id,
                                 
                                )
                              }
                              className={users.isAdmin ? 'text-green-500' : ''}
                            >
                              {users.isAdmin ? "Yes" : "No"}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 font-sub_heading   text-right text-sm font-medium">
                            <span
                              onClick={() => {
                                setShowModel(true);
                                setAlumniIdDelete(users._id);
                              }}
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
                                Are you sure that you want to delete Alumni
                                Profile ??
                              </p>
                              <div className="flex justify-end">
                                <Button
                                  onClick={handleCancel}
                                  className="text-gray-200 dark:bg-gray-700 dark:text-gray-200 border bg-[#27374D] border-none border-[#27374D] dark:border-[#DDE6ED] hover:bg-black hover:text-white mr-2"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleConfirmDelete(AlumniIdDelete)}
                                  className="bg-red-500 dark:bg-red-700 dark:text-gray-200 hover:bg-red-600"
                                >
                                  Confirm
                                </Button>
                              </div>
                            </div>
                          </Modal>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {errorMessages && (
    <div className='text-red-500 border border-red-500 text-center bg-red-100 p-2 rounded-md'>
        {errorMessages}
    </div>
)}
{successMessages && (
    <div className='text-green-500 border border-green-500 bg-green-100 p-2 text-center rounded-md'>
        {successMessages}
    </div>
)}
                  {fullUser > 6 && showMore && (
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

export default UserList;
