import React, { Fragment, useEffect } from 'react'

import { useState } from 'react'

function Achievments() {

  const [events, setEvents] = useState([])
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
  return (
    <div className="mx-auto max-w-7xl px-2 ">
        <div className="flex flex-col space-y-8 pb-10 pt-12 px-2 md:pt-24">

        <p className="text-center font-heading_font text-3xl text-[#27374D] dark:text-[#DDE6ED] md:text-5xl md:leading-10">
  Legacy of Champions: <span className="text-sky-700 dark:text-sky-500">AKGEC-FC</span> Journey to Greatness
</p>
          <p className="max-w-4xl mx-auto text-center text-base font-body_font   text-gray-600 md:text-xl">
          From winning and losing, we have learned, grown and shaped our game that can be seen through our achievements. Our goal: to keep our legacy alive, and to give our best.
          </p>
         
        </div>
    <div className='flex flex-col gap-y-3 w-full my-4'>
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
    </div>
    </div>
  )
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

export default Achievments