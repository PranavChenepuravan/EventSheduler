import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

export const Navbar3 = () => {
    let navigate = useNavigate()
    let logout = ()=>{
      localStorage.removeItem('password')
      localStorage.removeItem('email')
      console.log('sdfds')
      navigate('/')
    }
  return (
    <div className='bg-blue-950 w-screen h-24 text-white flex'>
      <div className='text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
        Event Seter
      </div>
      <div className='ml-auto flex gap-4 text-sm md:text-base lg:text-lg xl:text-xl mr-8 mt-12'>
      <Link to='session' className="hover:text-yellow-500">Session</Link>
      <button onClick={logout} className='pb-10 hover:text-yellow-500' >Log out</button>
      </div>
    </div>
  )
}
export default Navbar3