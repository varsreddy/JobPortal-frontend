import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debounced search dispatch
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchJobByText(input));
    }, 300);
    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <Input
            className="flex-1"
            placeholder="Filter by company name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-black text-white"
            onClick={() => navigate('/admin/jobs/create')}
          >
            Post New Job
          </Button>
        </div>

        <h1 className="text-2xl font-bold my-6">Posted Jobs</h1>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
