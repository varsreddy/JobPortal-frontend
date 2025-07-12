import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 py-8">
      <div className="flex flex-col gap-5 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium text-sm sm:text-base">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6a38c2]">Dream Jobs</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aperiam nihil molestiae aliquam ea inventore dicta.
        </p>
        <div className="flex w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full text-sm sm:text-base py-2"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6a38c2] text-white px-3 py-2">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
