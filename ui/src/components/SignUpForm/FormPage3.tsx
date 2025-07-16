'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FormPage3Props {
  progress: number;
  formData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    facilityName: string;
    departmentName: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: (data: any) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

const FormPage3: React.FC<FormPage3Props> = ({
  progress,
  formData,
  handleFormChange,
  nextStep
}) => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-6 py-12 bg-[#f9fafb]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Simple Sign Up <span className="text-[#01368B]">Powerful Results</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Security Information</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="bg-[#01368B] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleFormChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#01368B] focus:border-[#01368B] transition-all"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleFormChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#01368B] focus:border-[#01368B] transition-all"
            />
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="w-full bg-[#01368B] text-white py-3 rounded-md flex justify-center items-center gap-2 hover:bg-[#012a6d] transition-colors"
          >
            <span>Next</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default FormPage3;
