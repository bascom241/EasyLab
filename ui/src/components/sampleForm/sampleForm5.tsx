"use client";
import React from "react";
import Image from "next/image";
import { Printer } from "lucide-react";

const SampleForm5 = () => {
  const logo1 = require("../../../assets/check .png");
  // const logo2 = require("../../../assets/pose.png");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 gap-6 sm:gap-8">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
        Registration Complete
      </h1>

      {/* Success Message */}
      <p className="text-gray-600 text-center max-w-md">
        Your sample has been successfully registered in our system.
      </p>

      {/* Image container */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
        <Image
          src={logo1}
          alt="Success checkmark"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Additional Information (optional) */}
      <div className="text-center text-sm sm:text-base text-gray-500 max-w-md">
        <p>You can now print the QR code for sample tracking.</p>
        <p className="mt-1">Thank you for using our service!</p>
      </div>

      {/* Button */}
      <div className="w-full max-w-xs sm:max-w-sm">
        <button
          type="button"
          className="bg-[#01368B] hover:bg-[#012a6e] w-full flex items-center justify-center gap-2 text-white py-3 px-6 rounded-md transition-colors duration-200"
        >
          <Printer size={20} />
          <span>Print QR Code</span>
        </button>
      </div>

      {/* Optional: Add a "Back to Dashboard" button if needed */}
      {/* <button
        type="button"
        className="mt-2 text-[#01368B] hover:text-[#012a6e] text-sm font-medium transition-colors"
      >
        Back to Dashboard
      </button> */}
    </main>
  );
};

export default SampleForm5;