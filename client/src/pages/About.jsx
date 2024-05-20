import React from "react";
import image3 from "../components/Images/3ig.png";
import { Link } from "react-router-dom";
function About() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-2 ">
        <div className="flex flex-col justify-center space-y-8 pb-10 pt-12 px-2 md:pt-24">
          <p className=" mt-10 lg:mx-16 lg:px-12 text-center font-heading_font text-3xl text-[#27374D] dark:text-[#DDE6ED] md:text-5xl md:leading-10">
            Discover{" "}
            <span className="text-sky-700 dark:text-sky-500"> AKGEC-FC: </span>{" "}
            Uniting Passion, Precision, and Pride
          </p>
          <p className="max-w-4xl mx-auto text-center text-base font-body_font   text-gray-600 md:text-xl">
            Welcome to AKGEC Football Club (AKGEC-FC)! We are more than just a
            team; we're a symbol of discipline, respect, and outstanding
            gameplay in the football community
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 py-8 lg:flex-row">
          <div className="w-full mx-6 lg:w-3/6">
            <div className="space-y-6">
              <Link to="/family">
                <p className="text-sm text-center  font-semibold md:text-base text-gray-700 dark:text-gray-200">
                  See our alumni &rarr;
                </p>
              </Link>

              <div className=" text-center lg:text-left font-body_font">
                <p className="text-base text-gray-500 md:text-lg mb-3">
                  At AKGECFC Discipline is ingrained in our DNA. Our players
                  embody commitment, punctuality, and dedication, both on and
                  off the field.
                </p>
                <p className="text-base text-gray-500 md:text-lg mb-3">
                  Through rigorous training and unwavering focus, we
                  continuously elevate our performance. Respect is at the heart
                  of our club culture. We uphold the highest standards of
                  sportsmanship towards teammates, opponents, coaches, and
                  officials, fostering camaraderie and fair play.
                </p>
                <p className="text-base text-gray-500 md:text-lg mb-3">
                  Our gameplay is our signature. With a blend of tactical
                  prowess, technical finesse, and sheer passion, we strive to
                  leave our mark on every match, showcasing our skill, strategy,
                  and determination to win.
                </p>
                <p className="text-base text-gray-500 md:text-lg mb-3">
                  Join us in our journey to the top. Become a part of the
                  AKGECFC family and experience the thrill of football like
                  never before.
                </p>
              </div>
              <div className="flex flex-col  items-center justify-center mx-auto">
                <Link to="/achievements">
                  <button
                    type="button"
                    className="rounded-md   bg-sky-600 dark:bg-sky-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Achievements
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/6 mt-10 md:mt-0">
            <img
              src={image3}
              alt="Getting Started"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
