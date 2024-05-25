import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FloatingLabel } from "flowbite-react";
import {
  addToCartStart,
  addToCartSuccess,
  addToCartFail,
} from "../redux/function/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function Store() {
  const [menus, setMenus] = useState([]);
  const [fullMenu, setFullMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const menuSlug = location.pathname.split("/")[2];
  const [updateMessage, setUpdateMessage] = useState(null);
  const { cart } = useSelector((state) => state.cart);

  const [category, setCategory] = useState(" ");
  const handleCategoryChange = (category) => {
    if (category === "All Category") {
      setCategory(" ");
    } else {
      setCategory(category);
    }
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   try {
  //     const urlParams =new URLSearchParams(location.search);

  //     urlParams.set('searchTerm', searchValue)

  //     const search = urlParams.toString()
  //     navigate(`/search?${search}`)
  //   } catch (error) {
  //     console.log("Error fetching search:", error);
  //   }
  // }

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch(
        `/api/menu/getMenu?page=${currentPage}&menuCategory=${category}`
      );
      const data = await res.json();
      if (res.ok) {
        setMenus(data.message.menu.menus);
        console.log(menus);
        setFullMenu(data.message.menu);
      }
    };
    fetchMenu();
  }, [currentPage, category]);

  const handleCart = async (itemId) => {
    try {
      dispatch(addToCartStart());

      const res = await fetch(
        `/api/cart/addToCart/${currentUser?.message?.user?._id}/${itemId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(addToCartSuccess(data));
        setUpdateMessage("Menu added to cart successfully");
        setTimeout(() => {
          setUpdateMessage(null);
        }, 4000);
        return;
      } else {
        dispatch(addToCartFail(data.message));
        setError("Menu already in cart");
        setTimeout(() => {
          setError(null);
        }, 4000);
        return;
      }
    } catch (error) {
      setError("Error whiling adding menu to cart");
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  const handleRemoveCart = async (itemId) => {
    try {
      dispatch(addToCartStart());
      const res = await fetch(
        `/api/cart/remove/${currentUser?.message?.user?._id}/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(addToCartSuccess(data));
        setUpdateMessage("Menu removed from cart successfully");
        setTimeout(() => {
          setUpdateMessage(null);
        }, 4000);
      } else {
        dispatch(addToCartFail(data.message));
        setError("Error while removing menu from cart");
        setTimeout(() => {
          setError(null);
        }, 4000);
      }
    } catch (error) {
      setError("Error while removing menu from cart");
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  const [cartFetched, setCartFetched] = useState(false);

  useEffect(() => {
    if (!cartFetched && (!cart.data || cart.data.menus.length === 0)) {
      const fetchCart = async () => {
        try {
          const res = await fetch(
            `/api/cart/getCart/${currentUser?.message?.user?._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          if (res.ok) {
            dispatch(addToCartSuccess(data));
          } else {
            dispatch(addToCartFail(data.message));
          }
        } catch (error) {
          setError("Error while fetching cart");
          setTimeout(() => {
            setError(null);
          }, 4000);
        }
        setCartFetched(true);
      };
      fetchCart();
    }
  }, [cart, cartFetched, currentUser, dispatch]);

  

  return (
    <div className="">
      <div className="mx-auto max-w-6xl  px-2 ">
        <div className="flex flex-col space-y-8 pb-10 pt-12 px-2 md:pt-24">
          <p className="text-center font-serif  text-3xl text-[#27374D] dark:text-[#DDE6ED]  md:text-5xl md:leading-10">
           Gear Up for Greatness: <span className=" text-yellow-400">Campus-Play </span> Store
          </p>
          <p className="max-w-4xl mx-auto text-center text-base font-body_font  text-gray-700 md:text-xl">
          Discover a World of Sporting Gear, Apparel, and Accessories Tailored to Elevate Your Game and Showcase Your Passion for Sports on Campus Play Store
          </p>

          <form>
            <div className="mt-6 mx-auto flex justify-center items-center gap-4 w-full md:w-1/3">
              <div className="flex-1 ">
              <input
                className="flex h-10 w-full rounded-md border border-gray-500 text-gray-500 dark:bg-gray-300 bg-slate-100   px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={searchValue}
                placeholder="Search Topics"
                onChange={(e) => setSearchValue(e.target.value)}
              ></input>
              </div>
              <button
                type="submit"
                className="rounded-md bg-yellow-400 dark:text-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center w-full md:w-3/4 items-center mx-auto gap-4">
            <button
              type="button"
              onClick={() => handleCategoryChange("All Category")}
              className={`px-6 py-3 rounded-md ${
                category === " " || category === "All Category"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              All Category
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange("Cycling")}
              className={`px-6 py-3 rounded-md ${
                category === "Cycling"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
           Cycling
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange("Shoes")}
              className={`px-6 py-3 rounded-md ${
                category === "Shoes"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
          Shoes
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange("Equipment")}
              className={`px-6 py-3 rounded-md ${
                category === "Equipment"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
            Equipment
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange("Sports Kit")}
              className={`px-6 py-3 rounded-md ${
                category === "Sports Kit"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
             Sports Kit
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange("Accessories")}
              className={`px-6 py-3 rounded-md ${
                category === " Accessories"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              Accessories
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange("BackPacks")}
              className={`px-6 py-3 rounded-md ${
                category === "BackPacks"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
            BackPacks
            </button>
          </div>
        </div>

        <div className="grid mx-2 md:mx-6 lg:mx-16 gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3 ">
          {menus.map((me) => (
            <div
              key={me._id}
              className=" border cursor-pointer mx-2   bg-gray-50  rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-1.02"
            >
              <Link to={`/items/${me.slug}`}>
                <img
                  src={me.menuImage}
                  className=" px-3   w-full rounded-md"
                  alt="Menu Image"
                />
              </Link>
              <div className="min-h-min ">
                <Link to={`/items/${me.slug}`}>
                  <p className="mt-4 flex-1 text-2xl font-bold pb-4 text-gray-900 text-center ">
                    {me.menuName}
                  </p>
                  <p className=" text-gray-600 text-center px-4 w-full text-sm leading-normal ">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `${me.menuDescription.slice(0, 180)}...`,
                      }}
                    />
                  </p>
                </Link>
                <div className="flex py-4 items-center justify-around">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-red-500">
                      {me.menuDiscount}% off
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{me.discountPrice}
                    </span>
                    <span className="text-gray-500 line-through">
                      ₹{me.menuPrice} {/* Original price with strikethrough */}
                    </span>
                  </div>

                  {cart?.data?.menus?.find((m) => m.menuData._id === me._id)
                   ? (
                    <button
                      type="button"
                      className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={() => handleRemoveCart(me._id)}
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    
                    me.menuStatus==="Out of Stock" ?(<p
                   
                    className="rounded-md  px-3 py-2 text-sm font-semibold text-red-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    
                  >
                    Out of Stock
                  
                  </p>) :
                  (<button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#E52A3D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => handleCart(me._id)}
                  >
                    Add To Cart
                  
                  </button>)
                      
                    
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full border-t border-gray-300">
          <div className="mt-2 flex items-center justify-between">
            <div className="hidden  md:block text-gray-700">
              <p>
                showing <strong>1</strong> to <strong>6</strong> of{" "}
                <strong>{fullMenu.totalMenu}</strong> results
              </p>
            </div>
            <div className="space-x-2 py-5 flex justify-around">
              <button
                type="button"
                onClick={handlePreviousPage}
                className="rounded-md bg-black px-3 py-2 text-base font-body_font text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                className="rounded-md bg-black px-3 py-2 text-base font-body_font text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
