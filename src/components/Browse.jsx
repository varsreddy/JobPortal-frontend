import React, { useEffect } from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  const dispatch = useDispatch();
  useGetJobs();

  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 my-10">
        <h1 className="font-bold text-xl sm:text-2xl mb-6">
          Search Results ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
