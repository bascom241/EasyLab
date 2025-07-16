"use client";
import React, { useState } from "react";
import Image from "next/image";
import Admin from "../../../assets/Frame 33800 (1).png";
import User from "../../../assets/Frame 33800.png";
import { CheckCircle } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Login1Prop {
    nextStep:()=> void
}
const Login1:React.FC<Login1Prop> = ({nextStep}) => {
    const [selected, setSelected] = useState<string | null>("box1");

    const handleClick = (box: string) => {
        setSelected(box);
    };

    return (
        <main className="w-full h-screen flex  flex-col items-center justify-center gap-8 bg-white pt-16">
            {/* Box 1 */}

            <div className="flex-col sm:flex items-center gap-4 justify-center">


                <div
                    className={`w-72 h-64 relative flex items-center flex-col gap-4 justify-center rounded-md border-2 transition-all duration-300 cursor-pointer 
          ${selected === "box1" ? "border-green-500 bg-white" : "border-gray-100 bg-gray-100"}`}
                    onClick={() => handleClick("box1")}
                >
                    <Image src={Admin} alt="" className="h-36 w-36 rounded-full bg-white" />
                    {selected === "box1" ? <CheckCircle color="green" className="absolute top-6 right-4" /> : <small className="absolute top-6 right-4 w-6 h-6 border-2 border-white bg-white rounded-full"></small>}
                    <p className="">User</p>
                </div>

                {/* Box 2 */}
                <div
                    className={`w-72 h-64 relative flex flex-col gap-4 items-center justify-center rounded-md border-2 transition-all duration-300 cursor-pointer 
          ${selected === "box2" ? "border-green-500 bg-white" : "border-gray-100 bg-gray-100"}`}
                    onClick={() => handleClick("box2")}
                >
                    <Image src={User} alt="" className="h-36 w-36 rounded-full" />
                    {selected === "box2" ? <CheckCircle color="green" className="absolute top-6 right-4" /> : <small className="absolute top-6 right-4 w-6 h-6 border-2 border-white bg-white rounded-full"></small>}
                    <p>Admin</p>
                </div>
            </div>

      
                <button type='button' className='bg-[#01368B] w-40 flex items-center justify-center gap-3 text-white p-2 rounded-md' onClick={nextStep} >
                    <p className="text-[0.9rem]">Get started</p>
                    <ArrowRight size={20} />
                </button>
      
        </main>
    );
};

export default Login1;
