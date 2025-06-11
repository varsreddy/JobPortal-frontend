import { useDispatch } from 'react-redux';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Kerala", "Gujarat"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0 to 40k", "42k to 1 lakh", "1 lakh to 5 lakh"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  // Handle filter selection
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  // Dispatch filter query when value changes
  useEffect(() => {
    console.log("Selected Filter:", selectedValue);
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  // Clear filters when the user leaves the page
  useEffect(() => {
    return () => {
      console.log("Clearing filters on page exit");
      dispatch(setSearchedQuery(""));
      setSelectedValue(""); // Reset local state
    };
  }, []);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='my-3' />

      <RadioGroup onValueChange={changeHandler} value={selectedValue}>
        {filterData.map((data) => (
          <div key={data.filterType}>
            <h1 className='font-bold text-lg'>{data.filterType}</h1>
            {data.array.map((item, i) => {
              const itemId = `r${i}-${item}`;
              return (
                <div key={itemId} className='flex items-center space-x-2 my-2'>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>

      {/* ✅ Clear Filters Button */}
      <Button className="mt-4 bg-red-500 text-white hover:bg-red-600" onClick={() => setSelectedValue("")}>
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterCard;