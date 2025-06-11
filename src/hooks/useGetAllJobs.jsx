// import { setAllJobs } from '@/redux/jobSlice'
// import { JOB_API_END_POINT } from '@/utils/constant'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// const useGetAllJobs = () => {
//     const dispatch = useDispatch();
//     const {searchedQuery} = useSelector(store=>store.job);
//     useEffect(()=>{
//         const fetchAllJobs = async () => {
//             try{
//                 const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
//                 if(res.data.success){
//                     dispatch(setAllJobs(res.data.jobs));
//                 }
//             }catch(err){
//                 console.log(err);
//             }
//         }
//         fetchAllJobs();
//     },[searchedQuery]);
 
// }

// export default useGetAllJobs;







import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
  try {
    let url = `${JOB_API_END_POINT}/get`;

    if (searchedQuery && searchedQuery.trim() !== '') {
      url += `?keyword=${encodeURIComponent(searchedQuery.trim())}`;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      console.warn("No authentication token found. Redirecting to login...");
      return; // Prevent unauthorized API calls
    }

    console.log("Using token:", token); // ✅ Debugging token presence

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
  }, [searchedQuery]);
};

export default useGetJobs;