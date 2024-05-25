import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  updateFail,
  updateSucess,
  clearError,
} from "../../../redux/function/userSlice.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useNavigate } from "react-router-dom";
import { app } from "../../../firebase/firebase.js";
import { set } from "mongoose";
function CreateItems() {
  const [imageData, setImageData] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [error, setError] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setsuccessMessage] = useState(null);
  const [imageUploadProgres, setImageUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImageData(imageFile);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      if (!imageData) {
        setImageUploadError("Please select Menu image");
        setTimeout(() => {
          setImageUploadError(null);
        }, 3000);
        return;
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageData.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageData);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Could not upload image (image < 2mb)");
          setTimeout(() => {
            setImageUploadError(null);
            setImageUploadProgress(0);
          }, 3000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdateMessage("Image uploaded successfully");
            setFormData({ ...formData, menuImage: downloadURL });
            setImageUploadProgress(0);
            setImageFileURL(downloadURL);

            setTimeout(() => {
              setImageUploadError(null);
              setUpdateMessage(null);
            }, 3000);
          });
        }
      );
    } catch (error) {
      setError("Error in uploading image (image_size < 2mb)");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {

      const res = await fetch(`/api/menu/createMenu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      }

      setsuccessMessage(data.message.message);

      setTimeout(() => {
        setError(null);
        setsuccessMessage(null);
        navigate(`/menu/${data.status.menu.slug}`);
      }, 4000);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <div className="overflow-hidden  p-3 dark:glass-container md:w-2/4 md:px-14 min-h-screen mx-auto  bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md ">
      <div className="mb-4 flex items-center justify-center rounded-lg py-2">
        <h1 className="text-center font-heading_font text-3xl my-4 text-[#27374D] dark:text-[#DDE6ED]">
          Item Details
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>

            {/* Item Name */}
          <div className="mt-4 gap-6 dark:text-gray-500 font-body_font space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                Item Name<span className="text-red-700">*</span>
              </label>
              <input
                id="menuName"
                type="text"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Item Name"
                onChange={handleChange}
              />
            </div>
            {/* Item Price */}
            <div className="w-full">
              <label
                htmlFor="menuPrice"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Item Price
              </label>
              <input
                id="menuPrice"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent  text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700    focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Item Price"
                onChange={handleChange}
              />
            </div>

            {/* Item Category */}
            <div className="w-full">
              <label
                htmlFor="menuCategory"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Item Category
              </label>
              <input
                id="menuCategory"
                type="text"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Item Category"
                onChange={handleChange}
              />
            </div>

            {/* Item type  */}
            <div className="w-full">
              <label
                htmlFor="menuType"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Item Type
              </label>
              <select
                id="menuType"
                className="input-field border hover:shadow-md hover:rounded-xl px-4 py-2 rounded-md w-full focus:outline-none text-gray-600"
                onChange={handleChange}
              >
                <option value="">Select Item Type</option>
                <option value="Outdoor">OutDoor</option>
                <option value="Indoor">InDoor</option>
                <option value="E-Sports">E-Sports</option>
              </select>
            </div>

            {/* Item Discount */}
            <div className="w-full">
              <label
                htmlFor="itemDiscount"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Item Discount
              </label>
              <input
                id="menuDiscount"
                type="text"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Item Discount"
                onChange={handleChange}
              />
            </div>

            {/*Item Status */}
            <div className="w-full">
              <label
                htmlFor="menuType"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Item Status
              </label>
              <select
                id="menuStatus"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={handleChange}
              >
                <option value="">Select Item Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Description */}
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  htmlFor="itemDescription"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Item Description
                </label>
                <input
                  id="menuDescription"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400   focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Item Description"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image */}
            <div className="col-span-2 grid">
              <label
                htmlFor="menuType"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Item Image
              </label>
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="flex md:gap-8">
                  <div>
                    <input
                      id="menuImage"
                      type="file"
                      accept="image/*"
                      className="input-field border hover:shadow-md hover:rounded-xl px-4  rounded-md w-full focus:outline-none text-gray-600"
                      placeholder="Item Image"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="mx-4 px-6 border rounded bg-black text-gray-200 flex items-center">
                    <button
                      type="submit"
                      className=""
                      onClick={handleImageUpload}
                    >
                      {imageUploadProgres ? (
                        <div className="w-14 h-14 ">
                          <CircularProgressbar
                            value={imageUploadProgres}
                            text={`${imageUploadProgres || 0} % `}
                            styles={buildStyles({
                              pathColor: "#00ff00",
                              textColor: "#00ff00",
                              trailColor: "#E52A3D",
                              rotation: 0.25,
                            })}
                          />
                        </div>
                      ) : (
                        " Upload"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {imageUploadError && (
                <div className="text-center text-red-600 p-3 rounded-md">
                  {imageUploadError}
                </div>
              )}

              {updateMessage && (
                <div className="text-center text-green-500 p-3 font-bold rounded-md">
                  {updateMessage}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-6 flex gap-4">
            <button
              type="submit"
              className="bg-[#27374D] form-box text-white font-semibold py-2 px-4 rounded-md   w-full"
            >
              Create Item
            </button>
          </div>
      </form>
    </div>
  );
}

export default CreateItems;
