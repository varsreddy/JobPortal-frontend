import React, { useEffect } from 'react';
import ApplicantsTable from './ApplicantsTable';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { APPLICATION_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplications } from '@/redux/applicationSlice';
import { toast } from 'sonner';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_END_POINT}/${id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplications(res.data.job));
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast.error("Failed to fetch applicants.");
      }
    };
    fetchApplicants();
  }, [id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
