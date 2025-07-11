import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const { id } = useParams(); // Get job id from URL for editing
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  // Fetch job details if editing
  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
            withCredentials: true,
          });
          if (res.data.success) {
            const job = res.data.job;
            setInput({
              title: job.title || "",
              description: job.description || "",
              requirements: job.requirements || "",
              salary: job.salary || "",
              location: job.location || "",
              jobType: job.jobType || "",
              experience: job.experience || "",
              position: job.position || 0,
              companyId: job.company?._id || "",
            });
          }
        } catch (error) {
          toast.error("Failed to fetch job details");
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company._id === value);
    setInput({ ...input, companyId: selectedCompany?._id || "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res;
      if (id) {
        res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      } else {
        res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      }
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-2 gap-4 w-[80%] max-w-3xl p-5 bg-white rounded shadow"
        >
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>

          {/* Requirements */}
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
            />
          </div>

          {/* Salary */}
          <div>
            <Label>Salary (LPA)</Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
            />
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>

          {/* Job Type */}
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
            />
          </div>

          {/* Experience */}
          <div>
            <Label>Experience Level</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
            />
          </div>

          {/* Position */}
          <div>
            <Label>No of Positions</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
            />
          </div>

          {/* Company Dropdown */}
          {companies.length > 0 ? (
            <Select
              onValueChange={selectChangeHandler}
              value={input.companyId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black border border-gray-200 rounded-md shadow-md">
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              **Please register a company first, before posting a job.**
            </p>
          )}

          {/* Action Buttons */}
          <div className="col-span-2 flex flex-col sm:flex-row gap-3 mt-4">
            {loading ? (
              <Button className="w-full sm:w-auto">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-[#7209b7] text-white hover:bg-white hover:text-[#7209b7] border hover:border-[#7209b7]"
                >
                  {id ? "Update Job" : "Post Job"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/jobs")}
                  className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
