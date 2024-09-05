import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Schedule = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [beginning, setBeginning] = useState('');
  const [ending, setEnding] = useState('');
  const [data2, setData2] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let fetchData = async () => {
      let response = await axios.get('http://localhost:5000/admin/session');
      console.log(response.data);
      setData(response.data);
      setFilteredData(response.data); // Initialize filteredData with all sessions
    };
    fetchData();
  }, [refresh]);

  // Function to format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to handle date filtering
  const handleFilter = () => {
    if (beginning && ending) {
      const filtered = data.filter((session) => {
        const sessionStartDate = new Date(session.startdate);
        const sessionEndDate = new Date(session.enddate);
        const beginningDate = new Date(beginning);
        const endingDate = new Date(ending);

        // Include sessions that start or end within the date range
        return (
          (sessionStartDate >= beginningDate && sessionStartDate <= endingDate) ||
          (sessionEndDate >= beginningDate && sessionEndDate <= endingDate)
        );
      });
      setFilteredData(filtered);
    } else {
      // If no dates selected, show all sessions
      setFilteredData(data);
    }
  };

  let handleChange = (event) => {
    setData2({ ...data2, [event.target.name]: event.target.value });
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let response = await axios.post('http://localhost:5000/admin/shedule', data2);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex gap-4 mb-4">
          <label htmlFor="beginning" className="text-yellow-300 font-black">
            From
          </label>
          <input
            type="date"
            name="beginning"
            value={beginning}
            onChange={(e) => {
              handleChange(e);
              setBeginning(e.target.value);
            }}
          />
          <label htmlFor="ending" className="text-yellow-300 font-black">
            To
          </label>
          <input
            type="date"
            name="ending"
            value={ending}
            onChange={(e) => {
              handleChange(e);
              setEnding(e.target.value);
            }}
          />
          <button
            className="bg-yellow-300 text-black px-4 py-2 rounded"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Email
              </th>
              <th scope="col" className="px-6 py-3">
                User id
              </th>
              <th scope="col" className="px-6 py-3">
                From
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((session, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {session.userDetails?.email || 'N/A'}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {session?.userId || 'N/A'}
                  </th>
                  <td className="px-6 py-4">{formatDate(session.startdate)}</td>
                  <td className="px-6 py-4">{formatDate(session.enddate)}</td>
                  <td className="px-6 py-4 text-right">
                    <input type="checkbox" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-4">
                  No sessions available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex gap-4 mt-4">
          <label htmlFor="startingdttm" className="text-yellow-300 font-black">
            From
          </label>
          <input
            type="datetime-local"
            name="startingdttm"
            onChange={handleChange}
          />
          <label htmlFor="endingdttm" className="text-yellow-300 font-black">
            To
          </label>
          <input type="datetime-local" name="endingdttm" onChange={handleChange} />
          <button
            className="bg-yellow-300 text-black px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Schedule
          </button>
        </div>
      </div>
    </>
  );
};

export default Schedule;
