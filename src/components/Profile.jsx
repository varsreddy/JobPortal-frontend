import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const hasResume = user?.profile?.resume;
  const hasSkills = user?.profile?.skills?.length > 0;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        {/* Top Profile Section */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://media.istockphoto.com/id/1053291038/vector/business-finance-bar-profit-vector-illustration.jpg?s=612x612&w=0&k=20&c=r0axxeuEroKcQO7lhVziB0-AFuRTFfGUfnrfF1euzB4=" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-600">
                {user?.profile?.bio || "No bio provided."}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5 text-sm text-gray-700">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || "Not provided"}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="font-bold text-md">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {hasSkills ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} className="bg-black text-white rounded-full">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added yet.</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-5">
          <Label className="text-md font-bold">Resume</Label>
          <div className="mt-1">
            {hasResume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-words"
              >
                {user.profile.resumeOriginalName || "Download Resume"}
              </a>
            ) : (
              <span className="text-gray-500">No resume uploaded yet.</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 mb-10">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
