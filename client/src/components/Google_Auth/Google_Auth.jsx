import { FaGoogle } from "react-icons/fa";
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {app} from '../../firebase/firebase'
import { signInSucess } from "../../redux/function/userSlice";
function Google_Auth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth =async()=>{
    const provider = new GoogleAuthProvider()
   
    //whenever someone click on button than it give list of account to login
    provider.setCustomParameters({prompt:'select_account'})

    try{
      const resultsofGoogle = await signInWithPopup(auth,provider)
      
      const res = await fetch('/api/auth/google',{ //proxy add jarur karna hai in tailwind.config.js
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name:resultsofGoogle.user.displayName,
          email:resultsofGoogle.user.email,
          googlePhoto:resultsofGoogle.user.photoURL
        }),
      });

      const data = await res.json()
    
      if(res.ok){
        dispatch(signInSucess(data));
        navigate('/')
      }

    }catch(error){
      console.log(error);
    }

  }
  return (
    <button
      type="button"
      className="relative dark:text-[#0F1926] dark:bg-[#BFCDD9] inline-flex w-full items-center justify-center rounded-md border border-gray-400  px-3.5 py-2.5  font-body_font  text-[#27374D] bg-gray-100 transition-all duration-200 hover:bg-gray-300 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
      onClick={handleGoogleAuth}
    >
      <span className="mr-2 inline-block">
        <FaGoogle className="text-red-700" />
      </span>
              Continue with Google 
    </button>
  );
}

export default Google_Auth;
