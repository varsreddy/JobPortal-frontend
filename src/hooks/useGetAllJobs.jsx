import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery, salaryFilter } = useSelector(store => store.job); // ✅ Get salaryFilter here

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // ✅ Prevent unnecessary API calls if both filters are empty
        if (!searchedQuery.trim() && !salaryFilter) {
          console.log("Skipping job fetch - No filters applied.");
          return;
        }

        let url = `${JOB_API_END_POINT}/get`;

        if (searchedQuery && searchedQuery.trim() !== '') {
          url += `?keyword=${encodeURIComponent(searchedQuery.trim())}`;
        }

        // ✅ Ensure salaryFilter is properly formatted before adding it
        if (salaryFilter && salaryFilter.match(/^\d+\s*-\s*\d+$/)) {
          url += `${searchedQuery ? '&' : '?'}salary=${salaryFilter}`;
        }

        const token = localStorage.getItem('token');

        if (!token) {
          console.warn("No authentication token found. Redirecting to login...");
          return;
        }

        console.log("Using token:", token); // ✅ Debugging token presence
        console.log("Sending request to:", url); // ✅ Debugging URL format

        const res = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // ✅ Ensure proper token format
          }
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          dispatch(setAllJobs([]));
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        dispatch(setAllJobs([]));
      }
    };

    fetchJobs();
  }, [searchedQuery, salaryFilter]); // ✅ Added salaryFilter dependency
};

export default useGetJobs;