import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const [isApplied, setIsApplied] = useState(false);

  // ✅ Apply Job Handler
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);

        // ✅ Update applications in Redux for real-time UI
        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob?.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to apply.");
    }
  };

  // ✅ Fetch Single Job on Mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const job = res.data.job;
          dispatch(setSingleJob(job));

          // ✅ Set application state
          const hasApplied = job.applications?.some(
            (application) =>
              application.applicant === user?._id ||
              application?.applicant?._id === user?._id
          );
          setIsApplied(hasApplied);
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
        toast.error("Could not load job details.");
      }
    };

    fetchJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return <div className="text-center my-10">Loading job details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-bold text-xl">{singleJob.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob.salary} LPA
            </Badge>
          </div>
        </div>

        {!user ? (
          <Button
            onClick={() => (window.location.href = "/login")}
            className="rounded-lg bg-[#7209b7] text-white hover:bg-white hover:text-[#7209b7] border hover:border-[#7209b7]"
          >
            Login to Apply
          </Button>
        ) : (
          <Button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#7209b7] text-white hover:bg-white hover:text-[#7209b7] hover:border hover:border-[#7209b7]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        )}
      </div>

      {/* 📌 Job Details Section */}
      <h2 className="border-b-2 border-gray-300 font-semibold py-4 mt-8 text-lg">
        Job Description
      </h2>
      <div className="space-y-3 mt-4 text-gray-800">
        <p>
          <strong>Role:</strong> <span className="pl-4">{singleJob.title}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <span className="pl-4">{singleJob.location}</span>
        </p>
        <p>
          <strong>Description:</strong>{" "}
          <span className="pl-4">{singleJob.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          <span className="pl-4">{singleJob.experience} yrs</span>
        </p>
        <p>
          <strong>Salary:</strong>{" "}
          <span className="pl-4">{singleJob.salary} LPA</span>
        </p>
        <p>
          <strong>Total Applicants:</strong>{" "}
          <span className="pl-4">{singleJob.applications?.length || 0}</span>
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          <span className="pl-4">
            {singleJob?.createdAt?.split("T")[0] || "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
