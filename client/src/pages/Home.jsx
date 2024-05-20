import React, { useEffect ,Fragment} from "react";
import img1 from "../components/Images/1ig.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [getBlog, setGetBlog] = useState([]);
  const [events, setEvents] = useState([])
  const userId = currentUser?.message?.user?._id;
const isAdmin = currentUser?.message?.user?.isAdmin;

  useEffect(() => {
    try {
      const fetchEvents = async () => {
        const res = await fetch('/api/achievment/getachievment')
        const data = await res.json()
        if (res.ok) {
          setEvents(data.message.achievments.achievments)
        }
        else{
          console.log(data.error)
        }
      }
      fetchEvents()
    } catch (error) {
      console.log('Error fetching events:', error)
    }

  },[])

  useEffect(() => {
    try {
      const fetchBlog = async () => {
        const res = await fetch("/api/post/getpost?limit=4");
        const data = await res.json();
        
        if (res.ok) {
          setGetBlog(data.message.post.posts);
        }
      };
      fetchBlog();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);
  const first_Value = getBlog[0];
  const second_Value = getBlog.slice(1, 4);
  useEffect(() => {
    try {
      const fetchEvents = async () => {
        const res = await fetch('/api/achievment/getachievment?limit=3')
        const data = await res.json()
       
        
        if (res.ok) {
          setEvents(data.message.achievments.achievments)
        }
        else{
          console.log(data.error)
        }
      }
      fetchEvents()
    } catch (error) {
      console.log('Error fetching events:', error)
    }

  },[])


  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full bg-gray-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl lg:flex lg:flex-row lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center py-12 md:py-16 lg:w-3/6 lg:gap-x-6 lg:py-24 xl:col-span-5">
            <h1 className="mt-8 font-heading_font leading-9 tracking-normal text-3xl text-[#27374D] dark:text-gray-300 text-center lg:text-left md:text-4xl lg:text-5xl">
              Discover the Heartbeat of{" "}
              <span className="lg:text-5xl leading-9 text-3xl md:text-4xl font-bold text-center text-sky-600">
                AKGEC-FC
              </span>
              : Where Every Kick Tells a Story
            </h1>
            <p className="mt-8 text-base md:text-xl font-body_font px-3 md:p-0 text-center lg:text-left text-gray-500">
              AKGECFC: Champions in Unity, Masters of Discipline, Defenders of
              Respect, Embodiment of the Beautiful Game
            </p>
            <div className="flex gap-8 justify-center  lg:justify-start">
              <Link to="/about">
                <div className="mt-12 flex gap-4 justify-center lg:w-40 rounded-lg bg-black px-4 py-3 text-lg font-semibold text-white shadow-sm   hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  <button type="button" className=" ">
                    About-Us
                  </button>{" "}
                </div>
              </Link>
              <Link to="/blog">
                <div className="mt-12 flex gap-4 justify-center lg:w-40 rounded-lg bg-sky-700 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  <button type="button" className=" ">
                    Blogs
                  </button>{" "}
                </div>
              </Link>
            </div>
          </div>
          <div className="relative lg:w-3/6 my-auto xl:col-span-7">
            <img
              className="w-full h-auto bg-gray-50 dark:bg-neutral-950 object-cover rounded-lg"
              src={img1}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Blog Page */}
      <section className="relative overflow-hidden py-20">
        <div className="relative">
          <div className="mx-auto max-w-xl lg:max-w-7xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-4 inline-block text-sky-700 px-3 py-1 md:text-sm text-xs   font-extrabold font-subheading_font">
                OUR  BLOG
              </span>
              <h1 className="lg:text-5xl md:text-4xl text-3xl px-2 lg:px-0 text-[#27374D] dark:text-[#DDE6ED] font-heading_font "> Dive into Our Newest Blog Updates!</h1>
            </div>

            <div className="my-18 -mx-4 flex flex-wrap px-4">
              <div className="mb-12 w-full h-3/5 rounded-lg shadow-lg dark:glass-container md:mx-0 mx-5 dark:bg-[#131315]  bg-white lg:mb-0 lg:w-1/2">
                <Link to={`/blog/${first_Value?.slug}`}>
                <a className="group dark:border dark:border-gray-700 mx-auto rounded-lg   block  lg:px-0 w-full" href="#">
                  <img
                    className="mb-5 block h-[400px] w-full rounded-lg"
                    src={first_Value?.image}
                    alt={first_Value?.title}
                  />
                  {first_Value && first_Value.createdAt && (
                    <span className="mb-5 text-center block text-gray-600">
                      {new Date(first_Value.createdAt).toLocaleDateString()}
                    </span>
                  )}
                  <h4 className="mb-5 text-center text-gray-500 lg:px-6  text-2xl md:text-3xl font-semibold ">
                    {first_Value?.title}
                  </h4>
                </a>
                </Link>
              </div>
              <div className="w-full px-4 lg:w-1/2 bg">
                {second_Value.map((post, index) => (
                  <div key={index} className="flex flex-col   mb-10 shadow-lg  md:shadow-none md:bg-none md:mb-0  mx-auto   lg:flex-row ">
                    <Link to={`/blog/${post.slug}`}>
                    <a
                      className="group mb-8 rounded-lg shadow-lg dark:border-gray-700  dark:border dark:glass-container  dark:bg-[#131315]  bg-white md:flex"
                      href="#"
                    >
                      <img
                        className="lg:h-40 lg:w-40 w-full md:w-32 md:h-32 rounded-lg"
                        src={post.image}
                        alt=""
                      />
                      <div className="my-4 pt-2 md:ml-4 md:mt-0">
                       
                        <span className="mb-2 text-center md:text-left block text-gray-700">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <h4 className="text-xl text-gray-500  text-center md:text-left font-semibold ">
                          {post.title}
                        </h4>
                      </div>
                    </a>
                    </Link>
                  </div>
                ))}
              </div>

              
            </div>

            <div className="mt-8 text-center">
              <Link to="/blog">
                <div className="mt-12 w-2/3 text-base flex mx-auto gap-4 justify-center lg:w-40 rounded-lg bg-sky-700 px-4 py-3 md:text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <button
                type="button"
                    >
                View All Posts
              </button>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Achievments Section */}
      <div className='flex flex-col gap-y-3 w-full my-4'>
      <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-4 inline-block text-sky-700 px-3 py-1 md:text-sm text-xs    font-bold font-subheading_font">
                OUR  ACHIEVEMENTS
              </span>
              <h1 className="lg:text-5xl md:text-4xl text-3xl px-2 lg:px-0 text-[#27374D] dark:text-[#DDE6ED] font-heading_font"> Discover Our Remarkable Achievements</h1>
            </div>
      <Circle/>
    {events.map((event,key)=>{
      return <Fragment key={key}>
        <div className='grid grid-cols-[1fr_auto_1fr] gap-x-2 items-center mx-auto'>
          { event.direction === 'left' ?( <Event year={event.year} title={event.title}/>) : (<div> </div>)}
          <Pilars/>
          { event.direction === 'right' ?( <Event year={event.year} title={event.title}/>) : (<div> </div>)}
        </div>
        {key <(events.length-1) && <Circle/>}
      </Fragment>

    })}
      <Circle/>

      <div className="mt-14 mb-8 text-center">
              <Link to="/achievements">
                <div className=" w-2/3 text-base flex mx-auto gap-4 justify-center lg:w-40 rounded-lg bg-sky-700 px-4 py-3 md:text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <button
                type="button"
                    >
                Show More
              </button>
              </div>
              </Link>
            </div>
    </div>


<section className="mt-16">
  <div className="mx-auto mb-14 max-w-2xl text-center">
    <span className="mb-4 inline-block text-sky-700 px-3 py-1 md:text-sm text-xs font-bold font-subheading_font">
      UPCOMING EVENTS
    </span>
    <h1 className="lg:text-5xl md:text-4xl text-3xl px-2 lg:px-0 text-[#27374D] dark:text-[#DDE6ED] font-heading_font">
    Discover What's Ahead: Upcoming Events!!
    </h1>
  </div>
  <div className="flex flex-col justify-center">
  <h2 className="my-40 mb-44 text-center font-extrabold text-3xl text-gray-600 font-body_font" style={{ transform: 'rotate(-10deg)' }}>
    COMING SOON!!!!
  </h2>
</div>

</section>

    </div>
  );
}

const Circle =  () =>{
  return(
    <div className='rounded-full w-4 h-4 bg-sky-600 mx-auto'>

    </div>
  )
}


const Pilars =() =>{
  return (<div className='rounded-t-full rounded-b-full mx-auto w-2  h-full bg-[#27374D] dark:bg-gray-400    '>

  </div>)
}

const Event = ({ year, title }) => {
  return (
    <div className='transition duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-2xl flex flex-col gap-y-2 border border-gray-200 shadow-md rounded-xl p-4 dark:glass-container mx-auto  bg-white dark:bg-[#131315] '>
      <div className='text-sky-600 font-heading_font text-lg'>{year}</div>
      <div className='text-gray-600 font-body_font text-base'>{title}</div>
    </div>
  );
};
export default Home;
