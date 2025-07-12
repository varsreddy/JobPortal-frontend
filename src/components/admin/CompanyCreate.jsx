import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.warning("Company name is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res?.data?.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500 mt-1">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          type="text"
          placeholder="JobHunt, Microsoft, etc."
          className="my-2"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row items-center gap-4 my-10">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto bg-black text-white"
            onClick={registerNewCompany}
            disabled={loading}
          >
            {loading ? "Creating..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
