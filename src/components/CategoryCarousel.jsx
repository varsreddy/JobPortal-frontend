import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Artificial Intelligence",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4">
      <div className="relative max-w-6xl mx-auto my-20">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Explore Categories
        </h2>
        <Carousel className="w-full">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
              >
                <div className="flex justify-center">
                  <Button
                    onClick={() => searchJobHandler(cat)}
                    className="w-full h-24 rounded-xl text-lg font-medium bg-white text-gray-800 border border-gray-200 shadow-md hover:bg-gray-100 transition"
                    variant="ghost"
                  >
                    {cat}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
