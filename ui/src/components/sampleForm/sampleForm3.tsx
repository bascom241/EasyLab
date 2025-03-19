"use client"
import React, { useState } from 'react';
import { DATA } from '../../data';

const SampleForm3 = () => {
    const [tests, setTests] = useState(DATA);

    // Toggle individual checkbox
    const handleCheckboxChange = (index:any) => {
        const updatedTests = [...tests];
        updatedTests[index].checkbox = !updatedTests[index].checkbox;
        setTests(updatedTests);
    };

    return (
        <main className="bg-white w-2/3 flex flex-col gap-2 py-3 px-6">
            <h1 className="text-lg font-semibold">Sample Details</h1>
            
            {/* Search and Filter Section */}
            <div className="flex w-full mb-5 ">
                <select
                    className="w-1/3 bg-neutral-200 px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#01368B] text-xs h-full"
                >
                    <option value="filter">Filter</option>
                    <option value="Alphabetically">Alphabetically</option>
                    <option value="category">Category</option>
                </select>
                <input
                    placeholder="Search Test"
                    className="w-full bg-white px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#01368B] text-xs h-full"
                />
                <input
                    type="submit"
                    value="Submit"
                    className="w-1/3 bg-blue-300 px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#01368B] text-xs h-full cursor-pointer"
                />
            </div>

            <div className="w-full flex justify-between mb-2 ">
                <p>All</p>
                <div className='flex gap-2'>
                    <input
                    type='checkbox'
                    />
                    <p>Select all tests</p>
                </div>
            </div>

            {/* Test List */}
            <div className="flex flex-col gap-3 mt-2">
                {tests.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 border border-neutral-400  ${item.checkbox ? "bg-neutral-100" :  "bg-white"}`}
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
    );
};

export default SampleForm3;
