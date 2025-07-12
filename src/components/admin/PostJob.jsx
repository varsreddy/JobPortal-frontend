import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import { useSelector } from "react-redux";

const PostJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

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

  // Edit job if ID is provided
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
          toast.error("Failed to fetch job details.");
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id]);

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectChangeHandler = (value) => {
    setInput((prev) => ({ ...prev, companyId: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      toast.error("Please select a company.");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const endpoint = id
        ? `${JOB_API_END_POINT}/update/${id}`
        : `${JOB_API_END_POINT}/post`;
      const method = id ? axios.put : axios.post;

      const res = await method(endpoint, input, config);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center my-6 px-4">
        <form
          onSubmit={submitHandler}
          className="grid sm:grid-cols-2 gap-4 w-full max-w-4xl p-6 bg-white rounded-md shadow"
        >
          {/* Job Fields */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={input.title}
              onChange={changeEventHandler}
              placeholder="Frontend Developer"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Write about job role"
            />
          </div>

          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Input
              id="requirements"
              name="requirements"
              type="text"
              value={input.requirements}
              onChange={changeEventHandler}
              placeholder="React, MongoDB, etc"
            />
          </div>

          <div>
            <Label htmlFor="salary">Salary (LPA)</Label>
            <Input
              id="salary"
              name="salary"
              type="text"
              value={input.salary}
              onChange={changeEventHandler}
              placeholder="Ex: 6 - 10"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Hyderabad, Remote"
            />
          </div>

          <div>
            <Label htmlFor="jobType">Job Type</Label>
            <Input
              id="jobType"
              name="jobType"
              type="text"
              value={input.jobType}
              onChange={changeEventHandler}
              placeholder="Full-time, Internship"
            />
          </div>

          <div>
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              name="experience"
              type="text"
              value={input.experience}
              onChange={changeEventHandler}
              placeholder="0-2 years"
            />
          </div>

          <div>
            <Label htmlFor="position">No. of Positions</Label>
            <Input
              id="position"
              name="position"
              type="number"
              value={input.position}
              onChange={changeEventHandler}
              placeholder="5"
            />
          </div>

          {/* Company Dropdown */}
          <div className="sm:col-span-2 mt-1">
            <Label>Select Company</Label>
            {companies.length > 0 ? (
              <Select
                onValueChange={selectChangeHandler}
                value={input.companyId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a company" />
                </SelectTrigger>
                <SelectContent>
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
              <p className="text-sm text-red-600 font-semibold mt-1">
                * Please register a company first.
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-4">
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
                  className="w-full sm:w-auto border text-gray-600"
                  onClick={() => navigate("/admin/jobs")}
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
