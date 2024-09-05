import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    
    let handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    let handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const requiredField = ['email', 'password']

            for (const field of requiredField) {
                if (!data[field]) {
                    return
                }
            }

            let response = await axios.post('http://localhost:5000/common/login', data)
            console.log(response)
            if (response.data.usertype === 'admin') {
                localStorage.setItem('id', response.data._id)
                localStorage.setItem('email', response.data.email)
                navigate('/adminhome')
            } else if (response.data.usertype === 'people') {
                localStorage.setItem('id', response.data._id)
                localStorage.setItem('email', response.data.email)
                navigate('/peoplehome')
            }
        } catch (e) {
            console.log(e)
        }

        setData(data)
        console.log(data)
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen px-4 sm:px-0">
                <div className="w-full max-w-sm p-4 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Login</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input onChange={handleChange} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input onChange={handleChange} type="password" name='password' id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
