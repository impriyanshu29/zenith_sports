
import {useLocation} from 'react-router-dom'
import React, { useState,useEffect } from 'react';
import Sidebar from '../components/Dashboard/Sidebar'
import CreatePost from '../components/Post/CreatePost';
import {useSelector} from 'react-redux'
import Profile from '../components/Dashboard/Profile'
import UpdatePost from '../components/Post/UpdatePost';
import CreateAlumni from '../components/Alumni/CreateAlumni';
import UpdateAlumni from '../components/Alumni/UpdateAlumni';
import EditPost from '../components/Post/EditPost';
import UserList from '../components/UserList/Users';
import EditAlumni from '../components/Alumni/EditAlumni';
import UpdateAchievement from '../components/Achievements/UpdateAchievments';
import CreateAchievements from '../components/Achievements/CreateAchievements';
import EditAchievements from '../components/Achievements/EditAchievements';

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState('');
  console.log(tab);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
    
  }, [location.search]);
  return <div className='md:flex '>
    <div className=''>
      <Sidebar/>
  </div>
  
 
  {tab === 'profile' && <Profile/>}
  
  {currentUser.message.user.isAdmin && tab === 'createpost' && <CreatePost/>}
  {currentUser.message.user.isAdmin && tab === 'userlist' && <UserList/>}
  {currentUser.message.user.isAdmin && tab === 'updatepost' && <UpdatePost/>}
  {currentUser.message.user.isAdmin && tab === 'createAlumni' && <CreateAlumni/>}
  {currentUser.message.user.isAdmin && tab === 'updatealumni' && <UpdateAlumni/>}
  {currentUser.message.user.isAdmin && tab === 'updateAchievements' && <UpdateAchievement/>}
  {currentUser.message.user.isAdmin && tab === 'createAchievements' && <CreateAchievements/>}
  {currentUser.message.user.isAdmin && tab.startsWith('edit_post-')&& tab.length > 'edit_post-'.length && <EditPost/>}
  {currentUser.message.user.isAdmin && tab.startsWith('edit_alumni-')&& tab.length > 'edit_alumni-'.length && <EditAlumni/>}
{currentUser.message.user.isAdmin && tab.startsWith('edit_achievement')&& tab.length > 'edit_achievement-'.length && <EditAchievements/>}
  </div>
}

export default Dashboard















































































































































































// https://example.com/page?name=John&age=25
// The part after the question mark (?) is called the query string, and it contains key-value pairs like name=John and age=25. Now, if you want to work with and manipulate these values in JavaScript, you can use the URLSearchParams object.