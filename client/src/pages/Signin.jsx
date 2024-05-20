import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {Spinner} from 'flowbite-react' 
import {useDispatch,useSelector} from 'react-redux';
import { signInFail,signInSucess,signInStart } from '../redux/function/userSlice';
import { FaGoogle } from "react-icons/fa";
import Google_Auth from '../components/Google_Auth/Google_Auth';


function signin() {
const [formData, setFormData] = useState({});
const {loading,error} = useSelector(state => state.user);
const navigate = useNavigate();
const dispatch = useDispatch();




  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSucess(data));
        navigate('/'); // Redirect to the home page after successful sign-in
      } else {
        // Handle specific error cases
        if (data.error) {
          dispatch(signInFail(data.error));
        } else {
          dispatch(signInFail('An error occurred.'));
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      dispatch(signInFail('An error occurred.'));
    }
  };
  
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <Link to="/" className={`whitespace-nowrap self-center font-logo_font text-[#BFCDD9] text-sm sm:text-xl font-semibold`}>
        <span className='px-2 py-1  dark:bg-[#364559] bg-[#27374D] text-[#DDE6ED] rounded-lg'>AKGEC</span>
        -FC
      </Link>
          </div>
          <h2 className="dark:text-[#BFCDD9] text-center text-2xl  leading-tight font-heading_font text-[#27374D]">
            Sign in to your account
          </h2>
          <p className="mt-2 dark:text-[#65768C]  text-center font-body_font text-base text-[#9DB2BF] ">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="dark:text-[#BFCDD9]  marker:font-semibold text-[#27374D] hover:text-[#27374D] transition duration-100"
            >
              Sign Up
            </Link>
          </p>
        
          <form  className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5 dark:text-[#BFCDD9]">
              <div>
                <label htmlFor="" className="dark:text-[#65768C] text-base font-medium font-body_font  text-[#27374D]">
                  {' '}
                  Email {' '} or {' '} Username{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10  dark:bg-[#374151] dark:border-[#0F1926]  w-full rounded-md border  border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Email or Username"
                    id="username"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="dark:text-[#65768C] text-base font-medium font-body_font  text-[#27374D]">
                    {' '}
                    Password{' '}
                  </label>
                  <a href="#" title="" className="dark:text-[#65768C] text-sm font-semibold text-[#27374D] hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 dark:bg-[#374151] dark:border-[#0F1926]   w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-[#BFCDD9] focus:outline-none focus:ring-1 focus:ring-gray-400 dark:text-[#BFCDD9] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id='password'
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full dark:bg-[#0F1926] items-center justify-center rounded-md bg-[#27374D]  px-3.5 py-2.5 font-semibold leading-7 text-[#DDE6ED] hover:bg-[#DDE6ED] hover:text-[#27374D] transition-all duration-200"
                  disabled={loading}
                >
                  {
                    loading ? (
                      <>
                        <Spinner size='sm'/>
                        <span className='pl-4'>Loging in...</span>
                      </>
                    ):'Get Started'
                  }
                </button>
              </div>
            </div>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
          <div className="mt-3 space-y-3">
         <Google_Auth/>
         </div>
        </div>
      </div>
    </section>
  )
}

export default signin;