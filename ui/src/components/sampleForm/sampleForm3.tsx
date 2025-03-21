"use client";
import React, { useState } from "react";
import { DATA } from "../../data";

const SampleForm3 = () => {
  const [tests, setTests] = useState(DATA);
  const [selectedTests, setSelectedTests] = useState<
    { test: string; bgColor: string; color: string }[]
  >([]);

  const [searchItem,setSearchItem] = useState("");


  console.log(selectedTests);

  // Toggle individual checkbox
  const handleCheckboxChange = (index: number) => {
    const updatedTests = [...tests];
    updatedTests[index].checkbox = !updatedTests[index].checkbox;
    setTests(updatedTests);

    const selected = [...selectedTests]
    const testItem = updatedTests[index];


    if(testItem.checkbox){
      if(!selected.find(item => item.test === testItem.test)){
        selected.push({
          test: testItem.test,
          bgColor: testItem.bgColor,
          color: testItem.color
        })
      }
    } else{
      const updatedSelected = selected.filter(item => item.test !== testItem.test);
      setSelectedTests(updatedSelected);
      return;
    }

  setSelectedTests(selected)
  };
  const handleSearchTest = () => {
    const result = DATA.filter(item =>
      item.test.toLowerCase().includes(searchItem.toLowerCase())
    );
    setTests(result);
  };
  
  return (
    <div className="flex gap-4">
      {/* Left Side */}
      <main className="bg-white w-2/3 flex flex-col gap-2 py-3 px-6">
        <h1 className="text-lg font-semibold">Sample Details</h1>

        {/* Search and Filter Section */}
        <div className="flex w-full mb-5">
          <select className="w-1/3 bg-neutral-200 px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#01368B] text-xs h-full">
            <option value="filter">Filter</option>
            <option value="Alphabetically">Alphabetically</option>
            <option value="category">Category</option>
          </select>
          <input
            placeholder="Search Test"
            className="w-full bg-white px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#01368B] text-xs h-full"
            value={searchItem}
            onChange={(e)=>setSearchItem(e.target.value)}

          />
          <input
            type="submit"
            value="Submit"
            className="w-1/3 bg-blue-300 px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#01368B] text-xs h-full cursor-pointer"
            onClick={handleSearchTest}
          />
        </div>

        {/* Select All */}
        <div className="w-full flex justify-between mb-2">
          <p>All</p>
          <div className="flex gap-2">
            <input type="checkbox" />
            <p>Select all tests</p>
          </div>
        </div>

        {/* Test List */}
        <div className="flex flex-col gap-3 mt-2">
          {tests.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 border border-neutral-400 ${
                item.checkbox ? "bg-neutral-100" : "bg-white"
              }`}
            >
              {/* Custom Checkbox */}
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.checkbox}
                  onChange={() => handleCheckboxChange(index)}
                  className="peer hidden"
                />
                <div className="w-5 h-5 border-[1px] border-gray-400 bg-white rounded-md flex items-center justify-center peer-checked:border-green-500">
                  {item.checkbox && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="green"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20.3 5.3a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4L9 14.58l9.3-9.3a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </label>

              {/* Test Name */}
              <p className="text-sm font-medium">{item.test}</p>

              {/* Test Label with Unique Color */}
              <span
                className="text-xs font-semibold px-3 py-1 rounded-lg"
                style={{ backgroundColor: item.bgColor, color: item.color }}
              >
                {item.testLabel}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Selection Summary */}
      <div className="bg-white border-[1px] w-1/4 h-64 flex flex-col p-4 shadow-lg rounded-md">
        <p className="text-center font-semibold text-lg mb-3">Selection Summary</p>
        <hr className="mb-3 border-gray-300" />
        <ul className="grid grid-cols-2 gap-1 p-1">
          {selectedTests.map((item, index) => (
            <li key={index}   className="text-xs font-medium px-2 py-1 rounded-full text-center">
              <p
                className="text-white px-4 py-2 rounded-full text-center text-sm w-full font-light shadow-md"
                style={{ backgroundColor: item.bgColor, color: item.color }}
              >
                {item.test}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SampleForm3;
