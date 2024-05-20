// import React from 'react'
// import {useLocation} from 'react-router-dom'
// import { useState,useEffect } from 'react';
// import Sidebar from '../components/Dashboard/Sidebar';
// import CreatePost from '../components/Post/CreatePost';
// function Create_Post() {
    

//     const location = useLocation();
//     const [tab, setTab] = useState("");
//     useEffect(() => {
//       const urlParams = new URLSearchParams(location.search);

//       const tabFromUrl = urlParams.get('tab');
//       console.log('====================================');
//       console.log(tab);
//       console.log('====================================');
//       if(tabFromUrl){
//         setTab(tabFromUrl);
//       }

      
//     }, [location.search,setTab]);
//     return <div className='md:flex '>
//       <div className=''>
//         <Sidebar/>
//         {tab === 'createpost' && <CreatePost/>}
//     </div>
   
    
//     </div>
  
// }

// export default Create_Post