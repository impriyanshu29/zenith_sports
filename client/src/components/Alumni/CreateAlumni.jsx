import React from "react";
import { FileInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Button } from "flowbite-react"; // Import the 'Button' component
import { app } from "../../firebase/firebase.js";
import { uploadBytesResumable } from "firebase/storage";
import { getStorage, ref } from "firebase/storage";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getDownloadURL } from "firebase/storage";
import {useNavigate} from 'react-router-dom'

function CreateAlumni() {
    const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null);
  const [alumniData, setalumniData] = useState({});
  const [alumniImage, setAlumniImage] = useState(null);
  const [alumniImageUploadError, setAlumniImageUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [profileCreatedProgress , setProfileCreatedProgress] = useState(null)
  const [profileCreatedError , setProfileCreatedError] = useState(null)
 


  // Set a range of years
  const years = Array.from(
    { length: 10 },
    (_, index) => new Date().getFullYear() - index
  );

  //to handle image of alumni
  const handleAlumniImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAlumniImage(file);
    }
  };

  //to upload it on firebase
  const handlealumniImageUpload = async () => {
    try {
      if (!alumniImage) {
        setAlumniImageUploadError("Please select alumni image");
        setTimeout(() => {
          setAlumniImageUploadError(null);
        }, 3000);
        return;
      }

      setAlumniImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + alumniImage.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, alumniImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          setAlumniImageUploadError("Could not upload Image");
          setImageUploadProgress(null);
          setTimeout(() => {
            setAlumniImageUploadError(null);
          }, 3000);
        },
        () => {

          // Upload task completed successfully
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setUpdateMessage("Successfully Uploaded");
              setAlumniImageUploadError(null);
              setImageUploadProgress(null);

              setalumniData({ ...alumniData, image: downloadURL });
              setTimeout(() => {
                setUpdateMessage(null);
              }, 3000);
            })
            .catch((downloadError) => {
              console.error("Error getting download URL", downloadError);
              setAlumniImageUploadError("Could not get Image URL");
              setImageUploadProgress(null);
              setTimeout(() => {
                setAlumniImageUploadError(null);
              }, 3000);
            });
        }
      );
    } catch (error) {
      setAlumniImageUploadError(error);
    }
  }; 
  //  ----------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();                                                                   
    try {
      
      const res = await fetch("/api/alumni/createAlumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alumniData),
      });

      
      const data = await res.json();
    

      if(!res.ok){
        setProfileCreatedError(data.error)
       
        return
      }
      else{
        setProfileCreatedError(null)
        
        setProfileCreatedProgress(data.status)
        navigate(`/alumni/${data.message.alumni.slug}`)
      }
    } catch (error) {
        setProfileCreatedError("Something went wrong")
    }
  };
  return (
    <div className="overflow-hidden  p-3 dark:glass-container md:w-2/4 md:px-14 min-h-screen mx-auto  bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md ">
      <div className="mb-4 flex items-center justify-center rounded-lg py-2">
        <h1 className="text-center font-heading_font text-3xl my-4 text-[#27374D] dark:text-[#DDE6ED]">
          Alumni Details
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-lg font-subheading_font text-[#27374D] dark:text-[#DDE6ED] ">
            Personal Info
          </p>
          <div className="mt-4 gap-6 dark:text-gray-500 font-body_font space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                First Name<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent  text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700    focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your first name"
                id="firstName"
                onChange={(e) =>
                  setalumniData({ ...alumniData, firstname: e.target.value })
                }
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="lastName"
              >
                Last Name<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your last name"
                id="lastName"
                onChange={(e) =>
                  setalumniData({ ...alumniData, lastname: e.target.value })
                }
              ></input>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="about"
                >
                  About<span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Write something about alumni..."
                  id="about"
                  onChange={(e) =>
                    setalumniData({ ...alumniData, about: e.target.value })
                  }
                ></input>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="flex gap-4 items-center justify-between  border-gray-300 ">
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={handleAlumniImage}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handlealumniImageUpload}
                >
                  {imageUploadProgress ? (
                    <div className="w-14 h-14">
                      <CircularProgressbar
                        value={imageUploadProgress}
                        text={`${imageUploadProgress || 0} % `}
                        styles={buildStyles({
                          pathColor: "#00ff00", // Set your desired color here
                          textColor: "#00ff00", // Set the text color if needed
                          trailColor: "#d6d6d6", // Set the trail color if needed
                        })}
                      />
                    </div>
                  ) : (
                    " Upload Image"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-400 border-dashed">
          <p className="text-lg mt-2 font-subheading_font text-[#27374D] dark:text-[#DDE6ED]">
            College Info
          </p>

          <div className="mt-2 dark:text-gray-500 font-body_font mb-2 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
          <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="batch"
                >
                Batch<span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="number"
                  placeholder="Write something about alumni..."
                  id="batch"
                  onChange={(e) =>
                    setalumniData({ ...alumniData, batch: e.target.value })
                  }
                ></input>
              </div>
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="department"
              >
                Department
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter department"
                id="department"
                onChange={(e) =>
                  setalumniData({ ...alumniData, branch: e.target.value })
                }
              ></input>
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Company
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter present company"
                  id="company"
                  onChange={(e) =>
                    setalumniData({ ...alumniData, company: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-400 border-dashed">
          <p className="text-lg font-subheading_font mt-4  text-[#27374D] dark:text-[#DDE6ED]">
            Social Media Info
          </p>
          <div className="mt-2 dark:text-gray-500 font-body_font gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Instagram
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Instagram"
                  id="instagram"
                  onChange={(e) =>
                    setalumniData({ ...alumniData, instagram: e.target.value })
                  }
                ></input>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Linkedin
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-500   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter linkedin id.."
                  id="linkedin"
                  onChange={(e) =>
                    setalumniData({ ...alumniData, linkedin: e.target.value })
                  }
                ></input>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email Address <span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Enter email.."
                  id="email"
                  onChange={(e) =>
                    setalumniData({ ...alumniData, email: e.target.value })
                  }
                ></input>

                <div className="col-span-2 mt-8 mb-4 grid">

                  <Button
                    type="submit"
                    className="bg-[#27374D] mt-4 md:mt-0 dark:bg-gray-700 dark:text-gray-200"
                  >
                    Publish
                  </Button>
                  {profileCreatedError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                <strong className="font-bold">Error!! </strong>
                <span className="block sm:inline">{profileCreatedError}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setProfileCreatedError(null)}
                  >
                    <title>Close</title>
                    <path d="M14.348 5.636l-1.414-1.414L10 8.586 5.066 3.652 3.652 5.066 8.586 10l-4.934 4.934 1.414 1.414L10 11.414l4.934 4.934 1.414-1.414L11.414 10l4.934-4.934z" />
                  </svg>
                </span>
              </div>
)}
          {profileCreatedProgress && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                <strong className="font-bold">Hurray!! </strong>
                <span className="block sm:inline">{profileCreatedProgress}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setProfileCreatedProgress(null)}
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAlumni;
