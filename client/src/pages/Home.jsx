import React, { useEffect, Fragment } from "react";
import img1 from "../components/Images/Image1.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [getBlog, setGetBlog] = useState([]);
  const [events, setEvents] = useState([]);
  const userId = currentUser?.message?.user?._id;
  const isAdmin = currentUser?.message?.user?.isAdmin;
  const [isOpen, setIsOpen] = useState(
    Array.from({ length: 4 }).map(() => false)
  );

  const toggleDropdown = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  const faqs = [
    {
      question: "What is Campus Play?",
      answer:
        "Campus Play is a platform dedicated to hosting sports events, blogs, and more, connecting sports enthusiasts and athletes across campuses.",
    },
    {
      question: "How can I participate in events hosted on Campus Play?",
      answer:
        "Participating in events is easy! Simply browse through the available events on our platform, register for the ones that interest you, and get ready to showcase your skills.",
    },
    {
      question: "Are there any registration fees for participating in events?",

      answer:
        "Registration fees, if any, are specified for each event. Some events may be free to participate in, while others may have a nominal registration fee.",
    },
    {
      question: "Can I host my own event on Campus Play? ",
      answer:
        "Absolutely! If you're interested in hosting a sports event on our platform, reach out to us through our contact page or email us. We'd love to hear about your event idea!",
    },
  ];
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    try {
      const fetchEvents = async () => {
        const res = await fetch("/api/achievment/getachievment");
        const data = await res.json();
        if (res.ok) {
          setEvents(data.message.achievments.achievments);
        } else {
          console.log(data.error);
        }
      };
      fetchEvents();
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  }, []);

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
        const res = await fetch("/api/achievment/getachievment?limit=3");
        const data = await res.json();

        if (res.ok) {
          setEvents(data.message.achievments.achievments);
        } else {
          console.log(data.error);
        }
      };
      fetchEvents();
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  }, []);

  const [eventsData, setEventData] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/event/getEvent?limit=3`);
      const data = await res.json();
      if (res.ok) {
        setEventData(data)
   
      }
    };
    fetchPosts();
  }, );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full bg-gray-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl lg:flex lg:flex-row lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center py-12 md:py-16 lg:w-3/6 lg:gap-x-6 lg:py-24 xl:col-span-5">
            <h1 className="mt-8 font-heading_font leading-9 tracking-normal text-3xl text-[#27374D] dark:text-gray-300 text-center lg:text-left md:text-4xl lg:text-5xl">
              Experience Excitement of{" "}
              <span className=" text-yellow-400">Campus-Play </span> :
              Connecting Athletes Everywhere
            </h1>
            <p className="mt-8 text-base md:text-xl font-body_font px-3 md:p-0 text-center lg:text-left text-gray-500">
              Embrace the Thrill: Uncover Hidden Talents and Unleash Your
              Potential & Experience the Rush where Every Victory Tells Your
              Story of Triumph
            </p>
            <div className="flex gap-8 justify-center  lg:justify-start">
              <Link to="/about">
                <div className="mt-12 flex gap-4 justify-center lg:w-40 rounded-lg bg-black dark:bg-neutral-800 px-4 py-3 text-lg font-semibold text-white shadow-sm   hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  <button type="button" className=" ">
                    About-Us
                  </button>{" "}
                </div>
              </Link>
              <Link to="/blog">
                <div className="mt-12 flex gap-4 justify-center lg:w-40 rounded-lg bg-yellow-400 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
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
              <span className="mb-4 inline-block text-yellow-300 px-3 py-1 md:text-sm text-xs   font-extrabold font-subheading_font">
                OUR BLOG
              </span>
              <h1 className="lg:text-5xl md:text-4xl text-3xl px-2 lg:px-0 text-[#27374D] dark:text-[#DDE6ED] font-heading_font ">
                {" "}
                Dive into Our Newest Blog Updates!
              </h1>
            </div>

            <div className="my-18 -mx-4 flex flex-wrap px-4">
              <div className="mb-12 w-full h-3/5 rounded-lg shadow-lg dark:glass-container md:mx-0 mx-5 dark:bg-[#131315]  bg-white lg:mb-0 lg:w-1/2">
                <Link to={`/blog/${first_Value?.slug}`}>
                  <a
                    className="group dark:border dark:border-gray-700 mx-auto rounded-lg   block  lg:px-0 w-full"
                    href="#"
                  >
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
                  <div
                    key={index}
                    className="flex flex-col   mb-10 shadow-lg  md:shadow-none md:bg-none md:mb-0  mx-auto   lg:flex-row "
                  >
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
                <div className="mt-12 w-2/3 text-base flex mx-auto gap-4 justify-center lg:w-40 rounded-lg bg-yellow-400 px-4 py-3 md:text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  <button type="button">View All Posts</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl   px-2 py-10 md:px-0">
        <div>
          <div className="mx-auto text-[#27374D] dark:text-[#DDE6ED] text-center max-w-2xl lg:text-center">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-4 inline-block text-yellow-300 px-3 py-1 md:text-sm text-xs   font-extrabold font-subheading_font">
                FAQ
              </span>
              <h1 className="lg:text-5xl md:text-4xl text-3xl px-2 lg:px-0 text-[#27374D] dark:text-[#DDE6ED] font-heading_font ">
                {" "}
                Frequently Asked Questions!
              </h1>
            </div>
          </div>
          <div className="mx-auto mt-8 text-[#27374D] dark:text-[#DDE6ED] max-w-3xl space-y-4 md:mt-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
                  onClick={() => toggleDropdown(index)}
                >
                  <span className="flex text-lg  font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                    {faq.question}
                  </span>
                </button>
                {isOpen[index] && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p className="text-[#27374D] dark:text-[#DDE6ED]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="textbase mt-6 text-center text-gray-600">
            Can't find what you're looking for?{" "}
            <Link
              to="/contact"
              title=""
              className="font-semibold text-[#27374D] dark:text-[#DDE6ED] hover:underline"
            >
              Contact our support
            </Link>
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block text-yellow-400 px-3 py-1 md:text-sm text-xs font-bold font-subheading_font">
            UPCOMING EVENTS
          </span>
          <h1 className="lg:text-5xl md:text-4xl text-3xl px-2 lg:px-0 text-[#27374D] dark:text-[#DDE6ED] font-heading_font">
            Discover What's Ahead: Upcoming Events!!
          </h1>
        </div>
   
        <div className="grid gap-1 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3 ">
          {eventsData?.data?.map((post) => (
            <div key={post._id} className="w-[360px] mx-auto border cursor-pointer  dark:glass-container bg-gray-100 dark:bg-[#131315] rounded-lg shadow-md">
              <img
                src={post.image}
                alt={post.eventName}
                className="h-[290px] rounded-md w-full  rounded-t-md object-fill "
              />
              <div className="p-4">
                <Link to={`/events/${post.slug}`}>
                  <h1 className="inline-flex items-center text-gray-700 dark:text-gray-200 text-lg font-semibold">
                    {post.eventName.slice(0,20)+"....."}&nbsp; <FaArrowUpRightFromSquare />
                  </h1>
                </Link>
               

              <Link to={`/events/${post.slug}`}>
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
        
      </section>
    </div>
  );
}

export default Home;
