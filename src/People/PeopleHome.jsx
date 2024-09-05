import React from 'react'
import Topnav from '../Common/Navbar3'
import { Outlet } from 'react-router-dom'

export const PeopleHome = () => {
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
export default PeopleHome
