import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, TextInput, Select, FileInput } from "flowbite-react";
import "../../../src/glass.css";
import { getStorage, ref } from "firebase/storage";
import { set } from "mongoose";
import { app } from "../../firebase/firebase.js"; // Import the 'app' object from the firebase configuration file
import { uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom'




function CreatePost() {
  const [postImage, setPostImage] = useState(null);
  const [postImageUploadError, setPostImageUploadError] = useState(null);
  const [postImageUploadProgress, setimageUploadProgress] = useState(null);
  const [postData, setPostData] = useState({});
  const [updateMessage , setUpdateMessage] = useState(null)
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("uncategorized");
  const [contentUploadError , setcontentUploadError] = useState(null)
  const [contentUploadSucess, setcontentUploadSucess] = useState(null)
  const navigate = useNavigate();



  const handlePostImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
    }
  };

  const handlePostImageUpload = async () => {
    try {
      if (!postImage) {
        setPostImageUploadError("Please select an image");
        setTimeout(() => {
          setPostImageUploadError(null);
        }, 3000);
        return;

      }
      setPostImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + postImage.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, postImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setimageUploadProgress(progress.toFixed(0));
          
        },

        (error) => {
          console.log(error);
          setPostImageUploadError("Could not upload image");
          setimageUploadProgress(null);
          setTimeout(() => {
            setPostImageUploadError(null);
          }, 3000);
          
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdateMessage("Sucessfully Uploaded")
            setPostImageUploadError(null);
            setimageUploadProgress(null)
            console.log("File available at", downloadURL);
            setPostData({ ...postData, image: downloadURL });
            setTimeout(() => {
              setUpdateMessage(null);
            }, 3000);
          });
        }
      );
    } catch (error) {
      setPostImageUploadError("Could not upload image");
      console.log(error);
    }
  };

//----Upload Content--

    const handlePostSubmit = async (e) =>{
      e.preventDefault();
      try {
        const res = await fetch('/api/post/createpost',{
        method:"POST",
        headers:{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(postData)
      })
      const data = await res.json();
      if(!res.ok){
        setcontentUploadError(data.error)
       
        return
      }
      
      else{
        setcontentUploadError(null)
        console.log(data.status)
        setcontentUploadSucess(data.status)
        navigate(`/blog/${data.message.post.slug}`)
        

      }  
      
      } catch (error) {
        setcontentUploadError("Something went wrong")
      }
    }

  return (
    
    <div className="dark:glass-container md:w-2/4 p-3 min-h-screen mx-auto  bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md">
                {contentUploadError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                <strong className="font-bold">Error!! </strong>
                <span className="block sm:inline">{contentUploadError}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setcontentUploadError(null)}
                  >
                    <title>Close</title>
                    <path d="M14.348 5.636l-1.414-1.414L10 8.586 5.066 3.652 3.652 5.066 8.586 10l-4.934 4.934 1.414 1.414L10 11.414l4.934 4.934 1.414-1.414L11.414 10l4.934-4.934z" />
                  </svg>
                </span>
              </div>
)}
          {contentUploadSucess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                <strong className="font-bold">Hurray!! </strong>
                <span className="block sm:inline">{contentUploadSucess}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setcontentUploadSucess(null)}
                  >
                    <title>Close</title>
                    <path d="M14.348 5.636l-1.414-1.414L10 8.586 5.066 3.652 3.652 5.066 8.586 10l-4.934 4.934 1.414 1.414L10 11.414l4.934 4.934 1.414-1.414L11.414 10l4.934-4.934z" />
                  </svg>
                </span>
              </div>
)}
      <h1 className="text-center font-heading_font text-3xl my-4 text-[#27374D] dark:text-[#DDE6ED]">
        Create Post
      </h1>
      <form className="flex flex-col gap-4 p-6 " onSubmit={handlePostSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e)=> setPostData({...postData, title:e.target.value})}
          />
          <Select
            onChange={(e)=> setPostData({...postData, category:e.target.value})}
          >
            <option value="Uncategorized">Select</option>
            <option value="Exercise">Exercise</option>
            <option value="Life">Life</option>
            <option value="Sports">Sports</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-2 border-dashed   border-gray-300 p-3">
          <FileInput type="file" accept="image/*" onChange={handlePostImage} />
          <Button type="button" size="sm" onClick={handlePostImageUpload}>
            {postImageUploadProgress ? (
              <div className="w-14 h-14">
                <CircularProgressbar
                  value={postImageUploadProgress}
                  text={`${postImageUploadProgress || 0} % `}
                  styles={buildStyles({
                    pathColor: '#00ff00',  // Set your desired color here
                    textColor: '#00ff00', // Set the text color if needed
                    trailColor: '#d6d6d6', // Set the trail color if needed
                  })}
                />
              </div>
            ):(' Upload Image')}
           
          </Button>
        </div>
        {postImageUploadError && <p className='text-red-500'>{postImageUploadError}</p>}
        {updateMessage && <p className='text-green-500'>{updateMessage}</p>}
        {
          postData.image && (
            <img
              src={postData.image}
              className="w-full h-72 object-cover"
            />
          )
        }
        <ReactQuill
          theme="snow"
          className=" h-72 mb-12"
          placeholder="Write Something....."
          onChange={(value)=> setPostData({...postData, content:value})}
     
        />
         

      
        <Button
          type="submit"
          className="bg-[#27374D] mt-4 md:mt-0 dark:bg-gray-700 dark:text-gray-200"
        >
          Publish
        </Button>
      </form>

    </div>
  );
}

export default CreatePost;
