"use client";
import React, { useState, useEffect } from "react";
import { DATA } from "../../data";
import { ArrowRight } from "lucide-react";
import { useCreateSampleStore } from "@/store/useCreateSampleStore";

interface RequestersInformation {
  requestingDoctor: string;
  consultant: string;
}

interface FormData {
  surName: string;
  otherNames: string;
  age: string;
  gender: string;
  hospitalNumber: string;
  occupation: string;
  sampleInformation: string;
  sampleStatus: string;
  recieptNumber: string;
  ward: string;
  requestersInformation: RequestersInformation;
  testType: string[];
}

type SampleForm3Props = {
  nextStep: () => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formData: FormData;
  setFormData: (data: any) => void;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

const SampleForm3: React.FC<SampleForm3Props> = ({ 
  nextStep, 
  handleFormChange, 
  formData, 
  setFormData, 
  handleSubmit 
}) => {
  const [tests, setTests] = useState(DATA);
  const [selectedTests, setSelectedTests] = useState<
    { test: string; bgColor: string; color: string }[]
  >([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const { submitSample } = useCreateSampleStore();

  const handleCheckboxChange = (index: number) => {
    const updatedTests = [...tests];
    updatedTests[index].checkbox = !updatedTests[index].checkbox;
    setTests(updatedTests);

    const selected = [...selectedTests];
    const testItem = updatedTests[index];

    if (testItem.checkbox) {
      if (!selected.find(item => item.test === testItem.test)) {
        selected.push({
          test: testItem.test,
          bgColor: testItem.bgColor,
          color: testItem.color
        });
      }
    } else {
      const updatedSelected = selected.filter(item => item.test !== testItem.test);
      setSelectedTests(updatedSelected);
      return;
    }

    setSelectedTests(selected);
  };

  const handleSearchTest = () => {
    const result = DATA.filter(item =>
      item.test.toLowerCase().includes(searchItem.toLowerCase())
    );
    setTests(result);
  };

  const handleSelectAll = () => {
    const newSelect = !selectAll;
    setSelectAll(newSelect);

    const updatedTest = tests.map(test => ({
      ...test, 
      checkbox: newSelect
    }));
    setTests(updatedTest);

    if (newSelect) {
      setSelectedTests(updatedTest.map(test => ({
        test: test.test,
        bgColor: test.bgColor,
        color: test.color
      })));
    } else {
      setSelectedTests([]);
    }
  };

  const handleSampleSubmit = () => {
    submitSample(formData, nextStep);
  };

  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev, 
      testType: selectedTests.map(test => test.test)
    }));
  }, [selectedTests, setFormData]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full p-4">
      {/* Left Side - Test Selection */}
      <main className="bg-white w-full lg:w-2/3 flex flex-col gap-4 p-4 md:p-6 rounded-lg shadow-sm">
        <h1 className="text-lg md:text-xl font-semibold">Sample Details</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row w-full gap-2 mb-4">
          <select className="w-full sm:w-1/3 bg-neutral-100 px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#01368B] text-sm rounded-md">
            <option value="filter">Filter</option>
            <option value="Alphabetically">Alphabetically</option>
            <option value="category">Category</option>
          </select>
          <div className="flex w-full">
            <input
              placeholder="Search Test"
              className="flex-1 bg-white px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#01368B] text-sm rounded-l-md"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button
              type="button"
              className="bg-[#01368B] px-4 py-2 text-white text-sm rounded-r-md hover:bg-[#012a6e] transition-colors"
              onClick={handleSearchTest}
            >
              Search
            </button>
          </div>
        </div>

        {/* Select All */}
        <div className="w-full flex justify-between items-center mb-2">
          <p className="text-sm md:text-base">All Tests</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-gray-300 text-[#01368B] focus:ring-[#01368B]"
            />
            <span className="text-sm md:text-base">Select all tests</span>
          </label>
        </div>

        {/* Test List */}
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
          {tests.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 border rounded-lg ${
                item.checkbox ? "bg-neutral-50 border-[#01368B]" : "bg-white border-neutral-200"
              }`}
            >
              <label className="relative flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.checkbox}
                  onChange={() => handleCheckboxChange(index)}
                  className="hidden"
                />
                <div className="w-5 h-5 border border-gray-300 rounded-md flex items-center justify-center transition-colors">
                  {item.checkbox && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#01368B"
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
                <span className="text-sm md:text-base font-medium">{item.test}</span>
              </label>

              <span
                className="text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap"
                style={{ backgroundColor: item.bgColor, color: item.color }}
              >
                {item.testLabel}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Right Side - Selection Summary */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="bg-white border rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-center font-semibold text-lg md:text-xl mb-3">Selection Summary</h2>
          <hr className="mb-4 border-gray-200" />
          
          {selectedTests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
              {selectedTests.map((item, index) => (
                <div
                  key={index}
                  className="text-sm font-medium px-3 py-2 rounded-full text-center shadow-sm"
                  style={{ backgroundColor: item.bgColor, color: item.color }}
                >
                  {item.test}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm">No tests selected</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSampleSubmit}
          disabled={selectedTests.length === 0}
          className={`w-full flex items-center justify-center gap-2 text-white p-3 rounded-md ${
            selectedTests.length === 0 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#01368B] hover:bg-[#012a6e]'
          } transition-colors`}
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default SampleForm3;