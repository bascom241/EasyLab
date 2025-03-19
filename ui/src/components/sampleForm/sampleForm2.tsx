"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

type SampleForm2Props = {
    nextStep:() => void
}
const SampleForm2 = ({nextStep}: SampleForm2Props) => {


    const [sampleStatus, setSampleStatus] = useState("");

    const handleChange = (e:any) => {
      setSampleStatus(e.target.value);
    };
  
    return (
        <main className="bg-white w-2/3 flex flex-col gap-2 py-3 px-6">
            <div className="flex justify-between">
                <h1 className="font-semibold text-base mb-2">More Details</h1>
                <div className="">
                    <button
                        type="button"
                        className="bg-[#01368B] flex items-center justify-center gap-1.5 text-white px-3 py-1.5 rounded-md text-xs"
                        onClick={nextStep}
                    >
                        <p>Continue</p>
                        <ArrowRight size={18} />
                    </button>

                   
                </div>
            </div>

            <section className="flex flex-col gap-5 border border-neutral-100 rounded-md p-2.5">
                <h1 className="font-semibold text-base mb-2">Sample Formation</h1>

                <div className="flex gap-5 w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="sample" className="text-xs">Sample Type</label>
                        <select className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-xs">
                            <option value="blood">Blood</option>
                            <option value="plasma">Plasma</option>
                            <option value="serum">Serum</option>
                            <option value="protein">Protein</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="status" className="text-xs">Sample Status</label>
                        <select
                            className={`bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-xs ${sampleStatus === "accepted" ? "text-green-600" : sampleStatus === "rejected" ? "text-red-600" : "text-black"
                                }`}
                            value={sampleStatus}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="accepted" style={{color:"green"}}>Accepted</option>
                            <option value="rejected" style={{color:"red"}}>Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="number" className="text-xs">Receipt Number</label>
                        <input
                            id="number"
                            placeholder="3347694785w5h2"
                            className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md text-xs"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs">Patient Type</label>
                        <div className="flex items-center gap-1.5">
                            <input type="radio" name="patient" id="outpatient" />
                            <label htmlFor="outpatient" className="text-xs">Out Patient</label>
                            <input type="radio" name="patient" id="inpatient" />
                            <label htmlFor="inpatient" className="text-xs">In Patient</label>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="ward" className="text-xs">Ward/Clinic</label>
                        <select className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-xs">
                            <option value="femaleSurgicalWard">femaleSurgicalWard</option>
                            <option value="maleSurgicalWard">maleSurgicalWard</option>
                            <option value="ENT">ENT</option>
                            <option value="MOPD">MOPD</option>
                            <option value="A&E">A&E</option>
                            <option value="O&G">O&G</option>
                            <option value="GOPD">GOPD</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="date" className="text-xs">Date of Specimen Collection</label>
                        <input
                            id="date"
                            placeholder="24/12/2024"
                            className="bg-neutral-100 px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md text-xs"
                        />
                    </div>
                </div>


            </section>
            <section className="flex flex-col gap-2 border border-neutral-100 rounded-md p-2.5">
                <h1 className="font-semibold text-base mb-1 text-center" >Requesters Information</h1>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="doctor" className="text-xs">Requesting Doctor</label>
                        <input
                            id="doctor"
                            placeholder="Doctor Akinbile"
                            className="bg-neutral-100 px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md text-xs"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="consultant" className="text-xs">Consultant</label>
                        <input
                            id="consultant"
                            placeholder="Dr Ladi"
                            className="bg-neutral-100 px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md text-xs"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SampleForm2;
