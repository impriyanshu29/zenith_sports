import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


function CreateAchievements() {
    const {currentUser} = useSelector((state) => state.user)
  const [achievements, setAchievements] = useState({});
  const [success, setSuccess] = useState(null);
  const [failiur, setFailiur] = useState(null);

const navigate = useNavigate()
const urlParams = new URLSearchParams(location.search);
const tabFromUrl = urlParams.get("tab");

useEffect(() => {
    
    
    try {
        if(tabFromUrl && tabFromUrl.startsWith('edit_achievement-') && tabFromUrl.length > 'edit_achievement-'.length){
            const achievementsId  = tabFromUrl.slice('edit_achievement-'.length);
             
        const fetchAchievements = async () => {
            const res = await fetch(`/api/achievment/getachievment?_id=${achievementsId}`);
            const data = await res.json();
    
            if(res.ok){
                setAchievements(data.message.achievments.achievments[0])

            }
            else{
                setFailiur(data.error)
            }
        }
        fetchAchievements();
   
        // Code inside the try block
    } }catch (error) {
        
    
        failiur('Error fetching achievements:', error);
    }
       

    },[location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/achievment/editachievment/${currentUser.message.user._id}/${achievements._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(achievements),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.status);
        setFailiur(null);

        setTimeout(() => {
          navigate('/achievements')
          
        }, 4000);
      } else {
        setFailiur(data.error);
        setSuccess(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="overflow-hidden   p-3 dark:glass-container md:w-2/4 md:px-14 min-h-screen mx-auto  bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md ">
      <div className="mb-8 flex items-center justify-center rounded-lg py-2">
        <h1 className="text-center font-heading_font text-3xl my-4 text-[#27374D] dark:text-[#DDE6ED]">
          Achievments Form
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <p className="text-lg font-subheading_font text-[#27374D] dark:text-[#DDE6ED] ">
            Details of Achievments
          </p>
          <div className="mt-4 col-span-2 grid-0">
            <div className="w-full">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="year"
              >
                Year<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-12 w-full rounded-md border border-black/30 bg-transparent  text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700    focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter winning year"
                id="year"
                value={achievements.year}
                onChange={(e) =>
                  setAchievements({ ...achievements, year: e.target.value })
                }
              ></input>
            </div>

            <div className="w-full mt-8">
              <label
                className="text-sm text-gray-700 dark:text-gray-500  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="title"
              >
                Achievments<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-12   w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter the achievments"
                id="title"
                value={achievements.title}
                onChange={(e) =>
                  setAchievements({ ...achievements, title: e.target.value })
                }
              ></input>
            </div>

            <div className="w-full mt-8 mb-16">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="direction"
              >
                Direction <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-12 w-full rounded-md border border-black/30 bg-transparent  text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700    focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter Direction"
                id="direction"
                value={achievements.direction}
                onChange={(e) =>
                  setAchievements({ ...achievements, direction: e.target.value })
                }
              ></input>
            </div>
          </div>

          <div className="col-span-2 mt-8 mb-4 grid">
            {/* Content of the container */}
            <Button
              type="submit"
              className="bg-[#27374D] text-white py-2 px-4 rounded-md shadow-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200"
            >
              Publish
            </Button>

            <div className="">
              {failiur && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                  role="alert"
                >
                  <strong className="font-bold">Error!! </strong>
                  <span className="block sm:inline">
                    {failiur}
                  </span>{" "}
                  {/* Access the message property of the error object */}
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={() => setFailiur(null)}
                    >
                      <title>Close</title>
                      <path d="M14.348 5.636l-1.414-1.414L10 8.586 5.066 3.652 3.652 5.066 8.586 10l-4.934 4.934 1.414 1.414L10 11.414l4.934 4.934 1.414-1.414L11.414 10l4.934-4.934z" />
                    </svg>
                  </span>
                </div>
              )}

              {success && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
                  role="alert"
                >
                  <strong className="font-bold">Hurray!! </strong>
                  <span className="block sm:inline">
                    {success}
                  </span>{" "}
                  {/* Access the message property of the success object */}
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className="fill-current h-6 w-6 text-green-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={() => setSuccess(null)}
                    >
                      <title>Close</title>
                      <path d="M14.348 5.636l-1.414-1.414L10 8.586 5.066 3.652 3.652 5.066 8.586 10l-4.934 4.934 1.414 1.414L10 11.414l4.934 4.934 1.414-1.414L11.414 10l4.934-4.934z" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAchievements;
