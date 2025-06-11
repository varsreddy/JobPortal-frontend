import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery, salaryFilter } = useSelector(store => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let url = `${JOB_API_END_POINT}/get`;
        const queryParams = [];

        if (searchedQuery?.trim()) {
          queryParams.push(`keyword=${encodeURIComponent(searchedQuery.trim())}`);
        }

        if (salaryFilter && /^\d+-\d+$/.test(salaryFilter)) {
          const [min, max] = salaryFilter.split("-").map(Number);
          if (!isNaN(min) && !isNaN(max) && min >= 0) {
            queryParams.push(`salary=${salaryFilter}`);
          }
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        const token = localStorage.getItem('token');
        console.log("🛠 Token Found:", !!token);
        console.log("🔗 Requesting Jobs with:", { searchedQuery, salaryFilter, url });

        if (!token) return;

        const res = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        console.log("📦 API Response:", res.data); // Debugging

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          dispatch(setAllJobs([]));
        }
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
        dispatch(setAllJobs([]));
      }
    };

    fetchJobs();
  }, [searchedQuery, salaryFilter]);
};

export default useGetJobs;