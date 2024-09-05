import React from 'react'
import Topnav from '../Common/Navbar2'
import { Outlet } from 'react-router-dom'

export const AdminHome = () => {
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
export default AdminHome
