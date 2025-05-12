"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

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
    patientType: string;
    ward: string;
    dateOfSpecimen: string;
    requestersInformation: RequestersInformation;
    testType: string[];
}

type SampleForm2Props = {
    nextStep: () => void;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    formData: FormData;
    setFormData: (data: any) => void;
}

const SampleForm2: React.FC<SampleForm2Props> = ({ nextStep, formData, handleFormChange, setFormData }) => {
    return (
        <main className="bg-white w-full md:w-4/5 lg:w-2/3 mx-auto flex flex-col gap-3 md:gap-4 py-4 px-4 sm:px-6 md:px-8">
            {/* Header with Continue Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h1 className="font-semibold text-lg sm:text-xl">More Details</h1>
                <button
                    type="button"
                    className="bg-[#01368B] flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto"
                    onClick={nextStep}
                >
                    <span>Continue</span>
                    <ArrowRight size={18} />
                </button>
            </div>

            {/* Sample Formation Section */}
            <section className="flex flex-col gap-4 border border-neutral-100 rounded-lg p-4 sm:p-5">
                <h2 className="font-semibold text-base sm:text-lg mb-1">Sample Formation</h2>

                {/* Sample Type and Status */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="sample" className="text-sm">Sample Type</label>
                        <select 
                            className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-sm"
                            value={formData.sampleInformation}
                            name="sampleInformation"
                            onChange={handleFormChange}
                        >
                            <option value="blood">Blood</option>
                            <option value="plasma">Plasma</option>
                            <option value="serum">Serum</option>
                            <option value="protein">Protein</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="status" className="text-sm">Sample Status</label>
                        <select
                            className={`bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-sm ${
                                formData.sampleStatus === "accepted" ? "text-green-600" : 
                                formData.sampleStatus === "rejected" ? "text-red-600" : "text-black"
                            }`}
                            value={formData.sampleStatus}
                            onChange={handleFormChange}
                            name="sampleStatus"
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="accepted" className="text-green-600">Accepted</option>
                            <option value="rejected" className="text-red-600">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Receipt Number and Patient Type */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="number" className="text-sm">Receipt Number</label>
                        <input
                            id="number"
                            placeholder="3347694785w5h2"
                            className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md text-sm"
                            value={formData.recieptNumber}
                            name="recieptNumber"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm">Patient Type</label>
                        <div className="flex items-center gap-3">
                            <label className="inline-flex items-center gap-1">
                                <input 
                                    type="radio" 
                                    id="outpatient"
                                    name="patientType"
                                    value="Out Patient"
                                    checked={formData.patientType === "Out Patient"}
                                    onChange={handleFormChange}
                                    className="h-4 w-4"
                                />
                                <span className="text-sm">Out Patient</span>
                            </label>
                            <label className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    id="inpatient" 
                                    name="patientType"
                                    value="In Patient"
                                    checked={formData.patientType === "In Patient"}
                                    onChange={handleFormChange}
                                    className="h-4 w-4"
                                />
                                <span className="text-sm">In Patient</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Ward and Date */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="ward" className="text-sm">Ward/Clinic</label>
                        <select 
                            className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-sm"
                            name="ward"
                            value={formData.ward}
                            onChange={handleFormChange}
                        >
                            
                            <option value="femaleSurgicalWard">Female Surgical Ward</option>
                            <option value="maleSurgicalWard">Male Surgical Ward</option>
                            <option value="ENT">ENT</option>
                            <option value="MOPD">MOPD</option>
                            <option value="A&E">A&E</option>
                            <option value="O&G">O&G</option>
                            <option value="GOPD">GOPD</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="date" className="text-sm">Date of Specimen Collection</label>
                        <input
                            id="date"
                            type="date"
                            className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md text-sm"
                            value={formData.dateOfSpecimen}
                            name="dateOfSpecimen"
                            onChange={handleFormChange}
                        />
                    </div>
                </div>
            </section>

            {/* Requesters Information Section */}
            <section className="flex flex-col gap-3 border border-neutral-100 rounded-lg p-4 sm:p-5">
                <h2 className="font-semibold text-base sm:text-lg mb-1 text-center">Requesters Information</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="doctor" className="text-sm">Requesting Doctor</label>
                        <input
                            id="doctor"
                            placeholder="Dr. Smith"
                            className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md text-sm"
                            value={formData.requestersInformation.requestingDoctor}
                            name="requestersInformation.requestingDoctor"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="consultant" className="text-sm">Consultant</label>
                        <input
                            id="consultant"
                            placeholder="Dr. Johnson"
                            className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md text-sm"
                            value={formData.requestersInformation.consultant}
                            name="requestersInformation.consultant"
                            onChange={handleFormChange}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SampleForm2;