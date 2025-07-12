import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null, // logo file will be uploaded again
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image should be less than 2MB.");
      return;
    }
    setInput((prev) => ({ ...prev, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 sm:px-6 my-10">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold w-full sm:w-auto"
              onClick={() => navigate(-1)}
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl w-full sm:w-auto text-center sm:text-left">
              Company Setup
            </h1>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={input.name}
                onChange={changeEventHandler}
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
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="text"
                value={input.website}
                onChange={changeEventHandler}
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
              />
            </div>

            <div>
              <Label htmlFor="file">Logo</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                onChange={fileChangeHandler}
              />
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full mt-6 bg-black text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-black text-white hover:bg-neutral-800"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
