import React, { useState } from 'react'
import axios from 'axios'

export const Register = () => {
    const [data, setData] = useState({})
    const [refresh, setRefresh] = useState(false)
    let id = localStorage.getItem('id')

    let handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    let handleSubmit = async (event) => {
        event.preventDefault()
        data.usertype = 'people'
        try {
            let response = await axios.post('http://localhost:5000/common/register', data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
        setRefresh(!refresh)
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen px-4 sm:px-0">
                <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-8 md:p-10 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input onChange={handleChange} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input onChange={handleChange} type="password" name='password' id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                            <input onChange={handleChange} type="password" name='rpass' id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
