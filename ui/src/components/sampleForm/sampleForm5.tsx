"use client";
import React from "react";
import Image from "next/image";

const SampleForm5 = () => {
  const logo1 = require("../../../assets/check .png");
  const logo2 = require("../../../assets/pose.png")

  return (
    <main className="flex flex-col w-full items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Registration Done</h1>

      {/* Image container */}
      <div className="relative w-[150px] h-[150px]">
        {/* Background Image */}
        <Image
          src={logo1}
          alt="bg"
          width={150}
          height={150}
          className="absolute"
        />

        {/* Foreground Image */}
        {/* <Image
          src={logo2}
          alt="Foreground"
          width={150}
          height={150}
          className="absolute top-0 left-0 opacity-80"
        /> */}
      </div>

      {/* Button */}
      <div className="w-[400px] flex items-center justify-center">
        <button
          type="button"
          className="bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-2 rounded-md"
        >
          <p>Print QR Code</p>
        </button>
      </div>
    </main>
  );
};

export default SampleForm5;
