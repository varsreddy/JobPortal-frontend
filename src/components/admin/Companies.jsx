import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(setSearchCompanyByText(input));
    }, 300); // Debounce for better performance

    return () => clearTimeout(debounce);
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Input
            className="w-full sm:w-1/2"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-black text-white w-full sm:w-fit"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>

        <div className="mt-8">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
