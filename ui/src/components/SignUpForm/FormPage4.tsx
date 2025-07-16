'use client';
import React from 'react';
import { ArrowRight, Loader } from 'lucide-react';
import { toast } from "sonner";

interface FormPage4Props {
  progress: number;
  nextStep: () => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  isSignUp:boolean
}

const FormPage4: React.FC<FormPage4Props> = ({ progress, nextStep, handleSubmit , isSignUp}) => {

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await handleSubmit(e);
      console.log("Submitting");
    } catch (error) {
      console.log(error);
      toast.error((error as any)?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center pt-16 px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-3xl">
        <h1 className="mb-4 text-xl sm:text-2xl font-semibold text-center">
          Simple Sign Up <span className="text-[#01368B]">Powerful Results</span>
        </h1>

        {/* Progress Bar */}
        <div className="bg-gray-300 w-full rounded-full h-2 mb-6">
          <div className="bg-[#01368B] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Terms Section */}
      <section className="w-full max-w-3xl bg-gray-100 rounded-xl p-6 sm:p-10 flex flex-col gap-6 h-full overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <h2 className="text-lg sm:text-2xl font-semibold">Terms and Conditions</h2>
          <div className="bg-[#F3FCF8] text-[#0B9658] text-xs px-4 py-1 rounded-full border border-[#0B9658]">
            Please Read
          </div>
        </div>

        <div>
          <p className="font-bold mb-2">Instructions</p>
          <ul className="list-disc list-inside space-y-3 text-sm leading-relaxed text-gray-700">
            <li>By accessing or using Easy Lab ("the Platform"), you agree to comply with and be bound by these Terms and Conditions.</li>
            <li>You may not reproduce, modify, distribute, transmit, display, perform, or otherwise use the Platform's content without written consent.</li>
            <li>No event shall Easy Lab be liable for damages arising from use of the Platform.</li>
            <li>Easy Lab may suspend your account without prior notice.</li>
            <li>Easy Lab may modify these Terms at any time.</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="w-full mt-auto">
          <button
            className="bg-[#01368B] hover:bg-[#0d47a1] transition-all w-full sm:w-1/2 mx-auto flex items-center justify-center gap-2 text-white py-3 rounded-md"
            onClick={handleButtonClick}
          >
            {
              isSignUp? <Loader className="animate-spin"/> : <span>Sign Up</span>
            }
          </button>
        </div>
      </section>
    </main>
  );
};

export default FormPage4;
