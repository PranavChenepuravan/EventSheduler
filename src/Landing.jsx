import React from 'react'
import Topnav from './Common/Navbar'
import { Outlet } from 'react-router-dom'
export const Landing = () => {
  return (
    <>
     <div className='flex flex-col'>
     <Topnav/>
      <div className='back1'>
        <Outlet/>
      </div>
     </div>
    </>
  )
}
export default Landing