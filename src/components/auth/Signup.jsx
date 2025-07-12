import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB.");
      return;
    }
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 mt-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-6"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Sign Up</h1>

          {/* Full Name */}
          <div className="mb-4">
            <Label className="block mb-1">Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Reddy"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="block mb-1">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="reddy123@gmail.com"
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <Label className="block mb-1">Mobile Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="9876543210"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="block mb-1">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              required
            />
          </div>

          {/* Role & File Upload */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <span>Student</span>
              </label>
              <label className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <span>Recruiter</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                name="file"
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Submit */}
          {loading ? (
            <Button disabled className="w-full bg-black text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-neutral-800"
            >
              Signup
            </Button>
          )}

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
