import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Modal, Button } from "flowbite-react";

import { Link } from 'react-router-dom';
import { set } from 'mongoose';
function UpdateAchievments() {
const { currentUser } = useSelector((state) => state.user);
const [achievments, setAchievments] = useState([]);
const[fullAchievements,setFullAchievements] = useState([]);
const [showMore, setShowMore] = useState(true);
const [showModel, setShowModel] = useState(false);
const[achievementsIdDelete,setAchievementsIdDelete] = useState(null);
const [achievmentIdDelete , setAchievmentIdDelete] = useState(null);

useEffect(() => {
  const fetchachievements = async ()=>{
      try {
          const res = await fetch('/api/achievment/getachievment');
          const data = await res.json();
          if(res.ok){
              setAchievments(data.message.achievments.achievments)
              setFullAchievements(data.message.achievments.totalAchievments)
          }
          
          console.log(data);
          console.log('====================================');
          console.log(achievments);
          console.log(achievments.totalAchievments)
          console.log('====================================');
      } catch (error) {
          console.error('Error fetching achievments:', error);
      }    
    
  }
  fetchachievements();

},[currentUser.message.user.isAdmin])

const handleConfirmDelete = async() => {
  try {
    const res = await fetch(`/api/achievment/deleteachievment/${currentUser.message.user._id}/${achievementsIdDelete}`,{
      method: 'DELETE'
    });
    const data = await res.json();
    if(res.ok){
      setAchievments((prev)=>prev.filter((achieve)=>achieve._id !== achievementsIdDelete))
      setShowModel(false)
    }
    else{
      console.log(data.error)
    } 
  } catch (error) {
    console.log(error)
  }
}
const handleShowMore = async () => {
  const startIndex = achievments.length;
  try {
    const res = await fetch(
      `/api/achievment/getachievment?startIndex=${startIndex}`
    );
    const data = await res.json();
    if (res.ok) {
      setAchievments((prev) => [...prev, ...data.message.achievments.achievments]);
      if (data.message.achievements.achievements < 11) setShowMore(false);
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

const handleCancel = async () =>{
setShowModel(false)
}



  return (
    <>
      {currentUser.message.user.isAdmin && achievments.length >0 ? (
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
                          <span>Achievements</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left  text-md font-heading_font  dark:text-gray-200 text-gray-700"
                        >
                        year
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
                      {achievments.map((achieve) => (
                        <tr key={achieve._id}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              
                              <div className="ml-6">
                                <div className="text-sm font-sub_heading   text-gray-900 dark:text-gray-100">
                                  {achieve.title}
                                </div>


                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                          
                              <div className="text-sm font-sub_heading   text-gray-900 dark:text-gray-100 ">
                                {achieve.year}
                              </div>
                        
                            {/* <div className="text-sm text-gray-700">{person.department}</div> */}
                          </td>

                          
                          <td className="whitespace-nowrap px-4 py-4 font-sub_heading   text-right text-sm font-medium">
                            <span
                              onClick={() => {setShowModel(true);setAchievementsIdDelete(achieve._id)}}
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
                                Are you sure that you want to delete Alumni Profile ??
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
                              to={`/dashboard?tab=edit_achievement-${achieve._id}`}
                              className="cursor-pointer text-green-700 "
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {fullAchievements> 10 && showMore && (
                    <div className="flex justify-center mt-3 mb-3">
                      <button
                        onClick={handleShowMore}
                        className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
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

export default UpdateAchievments;
