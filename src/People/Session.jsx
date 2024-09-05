import React, { useState } from 'react';
import axios from 'axios';

export const Session = () => {
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [startDate, setStartDate] = useState(""); // Track the start date
  const id = localStorage.getItem('id');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value, userId: id });

    if (name === 'startdate') {
      setStartDate(value); // Update the start date when it changes
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post('http://localhost:5000/people/session', data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
    setRefresh(!refresh);
  };

  // Get the current date in the format YYYY-MM-DD
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Calculate the minimum end date, which is one day after the selected start date
  const getMinEndDate = () => {
    if (!startDate) return getCurrentDate(); // Default to current date if no start date is selected
    const start = new Date(startDate);
    start.setDate(start.getDate() + 1); // Add one day to the start date
    const year = start.getFullYear();
    const month = String(start.getMonth() + 1).padStart(2, '0');
    const day = String(start.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minDate = getCurrentDate();
  const minEndDate = getMinEndDate();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto max-w-3xl mt-1">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">From</th>
            <th scope="col" className="px-6 py-3">To</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">
              <input
                type="date"
                name="startdate"
                onChange={handleChange}
                min={minDate} // Set min date to the current date
                className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="date"
                name="enddate"
                onChange={handleChange}
                min={minEndDate} // Ensure end date is at least one day after start date
                className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-base"
        >
          Add Session
        </button>
      </div>
    </div>
  );
};

export default Session;
