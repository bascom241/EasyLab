"use client";
import React from "react";

const Page = () => {
  return (
    <main className='w-full p-4 md:p-6 lg:p-8 mt-12 md:mt-16 min-h-[calc(100vh-3rem)] flex flex-col overflow-hidden bg-neutral-50'>
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-4 md:mb-6 lg:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
          Welcome back to Reception
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-600">
          Let's get you started, Watch Preview
        </p>
      </div>

      {/* Video Container */}
      <div className="w-full flex-1 rounded-lg overflow-hidden shadow-sm bg-white">
        <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <video 
            className="absolute top-0 left-0 w-full h-full object-cover" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/LabDemo.mp4" type="video/mp4" />
            Your browser does not support this video.
          </video>
        </div>
      </div>

      {/* Optional: Add responsive padding/margin for larger screens */}
      <style jsx>{`
        @media (min-width: 1536px) {
          main {
            max-width: 1536px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </main>
  );
};

export default Page;