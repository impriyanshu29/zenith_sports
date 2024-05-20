import React from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import {Outlet } from 'react-router-dom'

function App() {
  
  return (
    <div className='min-h-screen  flex flex-wrap content-between '>
      <div className='w-full block'>
        <Header/>
        
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>  )
}

export default App