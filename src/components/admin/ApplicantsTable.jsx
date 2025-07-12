import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (id, status) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-6">
      <Table>
        <TableCaption>A list of recently applied users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname || "NA"}</TableCell>
                <TableCell>{item?.applicant?.email || "NA"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "NA"}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      {item.applicant.profile.resumeOriginalName || "Download"}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "NA"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="hover:bg-gray-100 p-1 rounded">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      <div className="text-sm font-medium text-gray-800 mb-2">
                        Update Status
                      </div>
                      {shortlistingStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(item._id, status)}
                          className="px-2 py-1 cursor-pointer rounded hover:bg-gray-100 transition-colors"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
