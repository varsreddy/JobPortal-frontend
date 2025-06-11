import { useDispatch } from 'react-redux';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { setSearchedQuery, setSalaryFilter } from '@/redux/jobSlice';

const salaryRanges = {
  "0 - 5": { min: 0, max: 5 },
  "5 - 10": { min: 5, max: 10 },
  "10 - 15": { min: 10, max: 15 },
  "15 - 20": { min: 15, max: 20 },
  "20+": { min: 20, max: Infinity }
};

const filterData = [
  { filterType: "Location", array: ["Delhi NCR", "Bangalore", "Hyderabad", "Kerala", "Gujarat", "Vizag"] },
  { filterType: "Industry", array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "AI Engineer"] },
  { filterType: "Salary (LPA)", array: Object.keys(salaryRanges) }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);

    if (salaryRanges[value]) {
      const min = salaryRanges[value]?.min;
      const max = salaryRanges[value]?.max === Infinity ? "Infinity" : salaryRanges[value]?.max;

      if (!isNaN(min) && !isNaN(max)) {
        dispatch(setSalaryFilter(`${min}-${max}`));
      } else {
        dispatch(setSalaryFilter(""));
      }
    } else {
      dispatch(setSearchedQuery(value));
    }

    console.log("✅ Selected Salary Filter:", salaryRanges[value]?.min, "-", salaryRanges[value]?.max);
    console.log("✅ Searched Query:", value);
  };

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
      dispatch(setSalaryFilter(""));
      setSelectedValue("");
    };
  }, []);

  const clearFilters = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
    dispatch(setSalaryFilter(""));
  };

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
      <Button className="mt-4 bg-red-500 text-white hover:bg-red-600" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterCard;