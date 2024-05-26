import React from "react";
import image3 from "../components/Images/Image-2.png";
import { Link } from "react-router-dom";
function About() {
  return (
    
        <div className="mx-auto max-w-7xl ">

{/* About Us - */}
<section></section>

<div className="flex flex-col space-y-8 pb-10 pt-12 px-2 md:pt-24">
          <p className="text-center font-heading_font text-3xl text-[#27374D] dark:text-[#DDE6ED] md:text-5xl md:leading-10">
          About <span className=" text-yellow-400">Campus-Play </span>
           
          </p>
         
          
        </div>

        <div className="container mx-auto px-4 lg:px-8 space-y-16">
  

          <div className="flex mt-12 lg:mt-12 lg:flex-row gap-6  lg:max-w-5xl   mx-auto flex-col">
            <div className="flex flex-grow lg:w-1/2 flex-col gap-4 lg:gap-7 lg:pb-10 pb-4 lg:mx-4 lg:px-4 text-center justify-center  py-auto">
              <p className="text-xl font-normal font-serif w-full text-[#27374D] dark:text-gray-300 text-center  lg:text-center md:text-4xl lg:leading-10 leading-6">
            Campus Play: Connecting You to Thrilling World of College  Sports Events.
              </p>
              <p className="max-w-4xl text-sm lg:text-base px-2 lg:px-0 text-center text-gray-500 md:text-xl">
              Welcome to Campus Play, where we unite the thrill of sports with the spirit of competition and camaraderie. Dive into a world of exhilarating events hosted across various colleges and universities. Participate in our meticulously organized sports tournaments, crafted to inspire athletes and sports enthusiasts alike. 
              </p>
      <Link to ="/items">
              <p className="text-sm text-center lg:text-center font-semibold md:text-base">
               Explore Now &rarr;
              </p>
              </Link>


            </div>
           
          </div>
</div>


</div>

      
  );
}

export default About;
