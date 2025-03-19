"use client";
import React from "react";

const Page = () => {
  return (
    <main className='w-full  p-4 mt-12 h-[screen] max-h-[30rem] flex-col max-w-full flex  overflow-hidden bg-neutral-50'>

      <div className="flex flex-col gap-2 mb-2">
        <h1>Welcome back to Reception</h1>
        <p>Lets get you started, Watch Preview </p>
      </div>
      <div className="w-full max-w-full ">

        <video className="w-full h-auto " autoPlay loop muted playsInline>
          <source src="/LabDemo.mp4" type="video/mp4" />
          Your browser does not support this video.
        </video>
      </div>

    </main>
  );
};

export default Page;
