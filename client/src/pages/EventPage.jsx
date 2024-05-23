import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function EventPage() {
  const { eventSlug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/event/getEvent?slug=${eventSlug}`);
        const data = await res.json();
        if (res.ok) {
          setEvent(data);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventSlug]);

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      {event && event.data.map((item) => (
        <div className="max-w-4xl w-full mx-4 md:mx-auto flex flex-col rounded-lg shadow-lg bg-white dark:bg-[#131315] overflow-hidden" key={item.id}>
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img
              src={item.image}
              alt={item.eventName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {item.eventName}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 mb-4">
              <p><strong>Category:</strong> {item.eventCategory}</p>
              <p><strong>Date:</strong> {item.eventDate}</p>
              <p><strong>Venue:</strong> {item.eventVenue}</p>
              <p><strong>Organizer:</strong> {item.eventOrganizer}</p>
              <p><strong>Contact:</strong> {item.eventOrganizerContact}</p>
              <p><strong>Email:</strong> <a href={`mailto:${item.eventOrganizerEmail}`} className="text-blue-500">{item.eventOrganizerEmail}</a></p>
              <p><strong>Registration Amount:</strong> Rs{item.eventRegistrationAmount}</p>
              <p><strong>Registration Last Date:</strong> {item.eventRegistrationLastDate}</p>
              <p><strong>Registration Link:</strong> <a href={item.eventRegistrationLink} className="text-blue-500">Register Here</a></p>
              <p><strong>Winning Amount:</strong> Rs{item.eventWinningAmount}</p>
              <p><strong>Number of Teams:</strong> {item.teamNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2"><strong>Rules:</strong></p>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {item.eventRules.split('. ').map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Link to={item.instagram}>
                <span className="flex items-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 text-sm font-semibold">
                  <FaInstagram className="mr-2" />
                  Instagram
                </span>
              </Link>
              <Link to={item.eventOrganizerLinkedin}>
                <span className="flex items-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 text-sm font-semibold">
                  <FaLinkedinIn className="mr-2" />
                  LinkedIn
                </span>
              </Link>
              <span className="flex items-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 text-sm font-semibold">
                {item.eventCategory}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventPage;
