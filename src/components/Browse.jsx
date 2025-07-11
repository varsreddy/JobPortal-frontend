import React, { useEffect } from 'react';
import Job from './Job';
import Navbar from './shared/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetJobs from '@/hooks/useGetAllJobs'; // ✅ Corrected hook import

const Browse = () => {
  const dispatch = useDispatch();

  // ✅ Run the job-fetching logic
  useGetJobs();

  // ✅ Pull jobs from Redux store
  const { allJobs } = useSelector(store => store.job);

  // ✅ Clear searched query on unmount
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  console.log("👀 Jobs in Redux:", allJobs); // ✅ Add this for debugging

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
        
        {allJobs.length === 0 ? (
          <p className='text-center text-gray-500'>No jobs found.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
