import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Alumni() {
  const { alumniSlug } = useParams();
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch(`/api/alumni/getalumni?slug=${alumniSlug}`);
        const data = await res.json();
        if (res.ok) {
          setAlumni(data.message.alumni.alumnis[0]);
        }
      } catch (error) {
        console.error('Error fetching alumni:', error);
      }
    };

    fetchAlumni();
  }, [alumniSlug]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {alumni && (
        <div className="max-w-2xl w-full mx-4 md:mx-auto  flex flex-col md:flex-row items-center rounded-md border bg-white dark:glass-container dark:bg-[#131315] shadow-lg">
          <div className="md:w-4/5 h-auto md:h-auto  rounded-t-md">
            <img
              src={alumni.image}
              alt={alumni.firstname}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col md:pl-6 mt-4 md:mt-0">
            <h1 className="text-[#27374D] dark:text-[#DDE6ED] text-lg font-semibold">
              {alumni.firstname} {alumni.lastname}
            </h1>
            <p className="mt-3 text-sm text-gray-500">{alumni.about}</p>
            {alumni.company && (
              <p className="mt-3 text-sm font-semibold text-gray-600">
                Works in - {alumni.company}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to={alumni.instagram}>
                <span className="flex items-center rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700 px-3 py-1 text-xs font-semibold">
                  <FaInstagram className="mr-1" />
                  Instagram
                </span>
              </Link>
              <Link to={alumni.linkedin}>
                <span className="flex items-center rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700 px-3 py-1 text-xs font-semibold">
                  <FaLinkedinIn className="mr-1" />
                  Linkedin
                </span>
              </Link>
              <span className="flex items-center rounded-full bg-gray-200 dark:bg-gray-400 text-gray-700 px-3 py-1 text-xs font-semibold">
                Batch - {alumni.batch}
              </span>
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <img
                className="inline-block h-8 w-8 rounded-full"
                src={alumni.image}
                alt={alumni.firstname}
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-400">
                  {alumni.firstname} {alumni.lastname}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  @{alumni.lastname.toLowerCase()}-{alumni.firstname.toLowerCase()}-{alumni.batch}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alumni;
