"use client"
import React from 'react'
import { ArrowRight } from 'lucide-react'

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

type SampleForm1Props = {
    nextStep: () => void
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    formData: FormData
    setFormData: (data: any) => void
}

const SampleForm1: React.FC<SampleForm1Props> = ({ nextStep, handleFormChange, formData, setFormData }) => {
    return (
        <main className='bg-white w-full  md:w-4/5 lg:w-2/3 p-4 sm:p-6 md:p-8 mx-auto'>
            <h1 className='font-semibold text-xl sm:text-2xl mb-3 md:mb-4'>Patient Details</h1>
            <section className='flex flex-col gap-4'>
                {/* Row 1: Surname and Other Names */}
                <div className='flex flex-col sm:flex-row gap-3 w-full'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='surname' className='text-sm sm:text-base'>Surname</label>
                        <input
                            id='surname'
                            placeholder='Easy Lab'
                            className='w-full bg-neutral-100 px-3 py-2 sm:px-4 sm:py-2 border-[1px] focus:outline-none focus:border-[#01368B] border-neutral-200 rounded-md cursor-pointer text-sm sm:text-base'
                            value={formData.surName}
                            name='surName'
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='o' className='text-sm sm:text-base'>Other Names</label>
                        <input
                            id='o'
                            placeholder='Team'
                            className='w-full bg-neutral-100 px-3 py-2 sm:px-4 sm:py-2 border-[1px] focus:outline-none focus:border-[#01368B] border-neutral-200 rounded-md cursor-pointer text-sm sm:text-base'
                            value={formData.otherNames}
                            name="otherNames"
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                {/* Row 2: Age and Gender */}
                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='age' className='text-sm sm:text-base'>Age</label>
                        <input
                            id='age'
                            placeholder='32'
                            className='w-full bg-neutral-100 px-3 py-2 sm:px-4 sm:py-2 border-[1px] focus:outline-none focus:border-[#01368B] border-neutral-200 rounded-md cursor-pointer text-sm sm:text-base'
                            value={formData.age}
                            name="age"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='gender' className='text-sm sm:text-base'>Gender</label>
                        <select
                            value={formData.gender}
                            name="gender"
                            onChange={handleFormChange}
                            className='w-full bg-neutral-100 px-3 py-2 sm:px-4 sm:py-2 border-[1px] focus:outline-none focus:border-[#01368B] border-neutral-200 rounded-md cursor-pointer text-sm sm:text-base'
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>

                {/* Row 3: Hospital Number and Occupation */}
                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='hospital' className='text-sm sm:text-base'>Hospital Number</label>
                        <input
                            id='hospital'
                            placeholder='789056789800'
                            className='w-full bg-neutral-100 px-3 py-2 sm:px-4 sm:py-2 border-[1px] focus:outline-none focus:border-[#01368B] border-neutral-200 rounded-md cursor-pointer text-sm sm:text-base'
                            value={formData.hospitalNumber}
                            name="hospitalNumber"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='occupation' className='text-sm sm:text-base'>Occupation</label>
                        <input
                            id='occupation'
                            placeholder='Farmer'
                            className='w-full bg-neutral-100 px-3 py-2 sm:px-4 sm:py-2 border-[1px] focus:outline-none focus:border-[#01368B] border-neutral-200 rounded-md cursor-pointer text-sm sm:text-base'
                            value={formData.occupation}
                            name="occupation"
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                {/* Continue Button */}
                <div className='w-full sm:w-[400px] flex justify-center sm:justify-start mt-2'>
                    <button 
                        type='button' 
                        className='bg-[#01368B] w-full sm:w-1/2 flex items-center justify-center gap-2 sm:gap-3 text-white p-2 rounded-md hover:bg-[#012a6e] transition-colors'
                        onClick={nextStep}
                    >
                        <p className='text-sm sm:text-base'>Continue</p>
                        <ArrowRight size={18} className='sm:size-5' />
                    </button>
                </div>
            </section>
        </main>
    )
}

export default SampleForm1