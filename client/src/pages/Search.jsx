import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useParams } from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
export default function Search() {
  const [value,setvalue] = useState('')
  const [search,setSearch] = useState([])
  const[alumni, setAlumni] = useState ([])

  const location = useLocation()
  const url = new URLSearchParams(location.search)
  const searchValue = url.get('searchTerm')
  const categoryValue = url.get('category')

  const alumniValue = url.get(`searchAlumni`)
  const branchValue = url.get(`batch`)

  
  useEffect(() => {
    try {
      const fetchSearch = async () => {
        let url = '/api/post/getpost?'
        if (!searchValue && !categoryValue ) {
          setSearch([])
          return
        }

        if(searchValue){
          url+= `searchTerm=${searchValue}`
        }
        else if(categoryValue)
        {
          url+=`category=${categoryValue}`
        }
        
        const res = await fetch(url);
        const data = await res.json()

        if (res.ok) {
          setSearch(data.message.post.posts)
        }
        else{
          console.log(data.error)
        }

      }
      fetchSearch()
    } catch (error) {
      console.log('Error fetching search:', error)
    }
  },[location.search])

  useEffect(() => {
    try {
      const fetchSearch = async () => {
        let url = '/api/alumni/getAlumni?'
        if (!alumniValue&& !branchValue)  {
          setAlumni([])
          return
        }

        if(alumniValue){
          url+= `searchAlumni=${alumniValue}`
        }
        else if(branchValue)
        {
          url+=`batch=${branchValue}`
        }
        
        const res = await fetch(url);
        const data = await res.json()

        console.log(data)
        if (res.ok) {
          setAlumni(data.message.alumni.alumnis)
        }
        else{
          console.log(data.error)
        }

      }
      fetchSearch()
    } catch (error) {
      console.log('Error fetching search:', error)
    }
  },[location.search])



  return (
  
<>
    {search.length > 0 ? (
     <div className="grid mx-8 gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3 ">
     {search.map((post) => (
       <div
         key={post._id}
         className=" border cursor-pointer  dark:glass-container bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md"
       >
         <Link to={`/blog/${post.slug}`}>
           <img
             src={post.image}
             className=" h-[250px]  w-full rounded-md"
             alt=""
           />
           <div className="min-h-min p-3">
             <Link to={`/search?category=${post.category}`}>
               <p className="mt-4 hover:font-extrabold w-full text-xs font-subheading_font  leading-tight font-semibold text-gray-600">
                 #{post.category}
               </p>
             </Link>
             <p className="mt-4 flex-1 text-xl font-semibold  text-[#27374D] dark:text-[#DDE6ED]">
               {post.title.slice(0, 32)}
               {"...."}
             </p>
             <p className=" text-gray-600 w-full text-sm leading-normal ">
               <p
                 dangerouslySetInnerHTML={{
                   __html: `${post.content.slice(0, 90)}...`,
                 }}
               />
             </p>
             <div className="mt-4 flex space-x-3 ">
               <img
                 className="h-full w-10 rounded-lg"
                 src={post.adminImage}
               />
               <div>
                 <p className="text-sm font-heading_font text-[#27374D] dark:text-[#DDE6ED]  leading-tight mb-1">
                   {post.adminName}
                 </p>
                 <p className="text-sm leading-tight text-gray-600">
                   {new Date(post.updatedAt).toLocaleDateString()}
                 </p>
               </div>
             </div>
           </div>
         </Link>
       </div>
     ))}
   </div>
    ):alumni.length > 0 ? (
      <div className="grid mx-10 gap-4 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3 ">
          {alumni.map((post) => (
            <div key={post._id} className="w-[320px] border cursor-pointer  dark:glass-container bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md">
              <img
                src={post.image}
                alt={post.firstname}
                className="h-[290px] rounded-md w-full  rounded-t-md object-fill "
              />
              <div className="p-4">
                <Link to={`/alumni/${post.slug}`}>
                  <h1 className="inline-flex items-center text-gray-700 dark:text-gray-200 text-lg font-semibold">
                    About {post.firstname}&nbsp; <FaArrowUpRightFromSquare />
                  </h1>
                </Link>
                <p className="mt-3 text-sm text-gray-600">{(post.about).slice(0,60)}{"..."}</p>
                <div className="mt-4 flex flex-row gap-1 ">
                  <Link to={post.instagram}>
                    <span className="flex items-center mb-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700   px-3 py-1 text-xs font-semibold ">
                      <FaInstagram className="mr-1" />
                      Instagram
                    </span>
                  </Link>
                  <Link to={post.linkedin}>
                    <span className="flex items-center mb-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700    px-3 py-1 text-xs font-semibold ">
                      <FaLinkedinIn className="mr-1" />
                      Linkedin
                    </span>
                  </Link>
                  <Link to ={`/search?batch=${post.batch}`}>
                  <span className="flex items-center mb-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700    px-3 py-1 text-xs font-semibold ">
                    {post.batch}
                  </span>
                  </Link>
                </div>

              <Link to={`/alumni/${post.slug}`}>
                <button
                  type="button"
                  className="mt-4 w-full rounded-sm  bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Know More
                </button>
              </Link>
              </div>
            </div>
          ))}
        </div>
    ) : (
     
      <div className="flex justify-center items-center min-h-screen">
        <h1>No search results found</h1>
      </div>

    )}

 
  
    </>
  )
}
