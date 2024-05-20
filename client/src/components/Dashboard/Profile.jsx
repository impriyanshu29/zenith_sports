import React, { useRef, useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";
import { app } from "../../firebase/firebase";
import {getDownloadURL, getStorage, uploadBytesResumable} from 'firebase/storage'
import {updateFail,clearError,updateStart,updateSucess, signOutSucess,deleteUserFail,deleteUserStart,deleteUserSucess } from "../../redux/function/userSlice";
import { ref } from 'firebase/storage';
import { useDispatch } from "react-redux";
import { set } from "mongoose";
import {Spinner} from 'flowbite-react' 

import {Modal} from 'flowbite-react'; 
import '../../../src/glass.css'


function Profile() {
  const { currentUser,error,loading } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadProgress,setimageUploadProgress] = useState(null)
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  
  const [imageFileUploadError, setimageUploadError] = useState(null)
  const fileReference = useRef();


  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(()=>{
    if(image) {
      uploadImage();
    }
  },[image])

  

  const uploadImage = async () => {

    setimageUploadError(null);
    
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    //to get info how much byte uploaded
    const uploadBytes = uploadBytesResumable(storageRef, image);
    uploadBytes.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageUploadProgress(progress.toFixed(0));
      }, (error) => {
        setimageUploadError('Could not upload image (Image < 2mb)');
        setimageUploadProgress(null);
        setImage(null);
        setImageUrl(null);
        
        
      },
    ()=>{ getDownloadURL(uploadBytes.snapshot.ref).then((downloadURL) => {
      setImageUrl(downloadURL);
      setFormData({...formData,coverImage:downloadURL});
      
    })}
    );
    }

  
  const handleLogout = async() => {
    try {
      const res = await fetch(`/api/auth/logout`,{
        method:"POST", 
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signOutSucess());
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
      
    }
  }

//------------------------------------Update Profile------------------------------------------------------
  const handleUpdate = async (e) => {
    
     setFormData({...formData,[e.target.id]:e.target.value})
  }

  const [updateMessage, setUpdateMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(Object.keys(formData).length === 0){
      return;
    }
   try {
    dispatch(updateStart());
    const res = await fetch(`/api/user/update/${currentUser.message.user._id}`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
    })

    const data = await res.json();
  if(!res.ok){
      dispatch(updateFail(data.error)) 
     
    }
    

    else{
      dispatch(updateSucess(data));
      setUpdateMessage("Boom! Successfully spruced up your profile. Looking fresh and updated!");
  
    }
    
    setTimeout(() => {
      setUpdateMessage(null);
      dispatch(clearError());
      
    }, 4000);

   } catch (error) {
    console.log(error);
   }
  }

  const {} = useSelector(state => state.user);


  // ------------------------------------Confirmation Model------------------------------------------------------
    const [showModel, setShowModel] = useState(false);
    const handleDelete = async() => {
      setShowModel(false);
    }
    const handleConfirmDelete = async () => {
      setShowModel(false);
      try {
       
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser.message.user._id}`,{
          method:"DELETE"
        })
        const data = await res.json();
        if(!res.ok){
          dispatch(deleteUserFail('Could not delete account'));
        }
        else{
          dispatch(deleteUserSucess(data));
          
        }
        setTimeout(() => {
          error(null);
        }, 3000);
      } catch (error) {
       dispatch(deleteUserFail(error.message));
        
      }
    }
    const handleCancel = () => {
      setShowModel(false);
    }

  return (
    <div className="dark:glass-container md:w-2/4 dark:bg-[#131314]  mx-auto p-6 lg:p-20 bg-gray-100 dark:text-[#A3B2BF] rounded-md shadow-md">
      <h1 className="text-center text-3xl font-heading_font text-[#27374D] dark:text-[#DDE6ED] mb-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImage}
          ref={fileReference}
          hidden
        />
                    
        <div
          className="w-32 h-32 self-center cursor-pointer"
          onClick={() => {
            fileReference.current.click();
          }}
        >
          <img
            src={imageUrl || currentUser.message.user.coverImage}
            alt="user"
            className="w-full h-full rounded-full object-cover border-4 border-[#27374D] dark:border-gray-100 dark:bg-[#364559] bg-[#DDE6ED]"
          />
        </div>
        {imageFileUploadError && <p className="text-red-500">{imageFileUploadError}</p>}
        <TextInput onChange={handleUpdate}
          type="text"
          id="username"
          defaultValue={currentUser.message.user.username}
          placeholder="username"
          color="gray-100 "
          className="input-field  text-gray-800 hover:text-gray-700 "
        />
        <TextInput onChange={handleUpdate}
          type="email"
          id="email"
          defaultValue={currentUser.message.user.email}
          placeholder="Email"
          color="gray-100 "
          className="text-gray-800 input-field"
        />
        <TextInput onChange={handleUpdate}
          type="password"
          id="password"
          defaultValue="##############"
          placeholder="Password"
          color="gray-100"
          className="text-gray-800 input-field"
        />
         {error && <p className='text-red-500'>{error}</p>}
        {updateMessage && <p className='text-green-500'>{updateMessage}</p>}
        <Button
          
          type="submit"
          className="bg-[#27374D] dark:bg-gray-700 dark:text-gray-200"
          disabled={loading}
        >
          {
                    loading ? (
                      <>
                        <Spinner size='sm'/>
                        <span className='pl-4'>Updating...</span>
                      </>
                    ):'Update Profile'
                  }
        </Button>       
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModel(true)} className="cursor-pointer hover:underline">Delete Account</span>
        <span  onClick={handleLogout} className="cursor-pointer hover:underline">Sign Out</span>
      </div>
      <Modal 
        show={showModel}
        onClose={handleCancel}
        onConfirm={handleDelete}
        popup
        size="sm">
      <div className="p-6">
        <p className="text-lg font-body_font mb-4 text-[#27374D] dark:text-[#DDE6ED]">Are you seriously planning to leave me ? Our friendship is about to take a hit!!!!</p>
        <div className="flex justify-end">
          <Button onClick={handleCancel} className="text-gray-200 dark:bg-gray-700 dark:text-gray-200 border bg-[#27374D] border-none border-[#27374D] dark:border-[#DDE6ED] hover:bg-black hover:text-white mr-2">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} className="bg-red-500 dark:bg-red-700 dark:text-gray-200 hover:bg-red-600">
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
    </div>
  );
}

export default Profile;
