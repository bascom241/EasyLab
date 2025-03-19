'use client'
import React, { useState } from 'react';
import lab from '../../../assets/laboratory-worker-working-with-modern-microscope-while-conducting-coronavirus-research.jpg';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react'; // Import Check icon

interface FormPage1Props {
    progress: number;
    formData: {
        fullName: string
        email: string,
        phoneNumber: string,
        facilityName: string,
        facilityNumber: string,
        role: string,
        departmentName: string,
        password: string,
        confirmPassword: string
    },
    setFormData: (data: any) => void,
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    nextStep: () => void
}

const FormPage2: React.FC<FormPage1Props> = ({ progress, formData, setFormData, handleFormChange, nextStep }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle option selection
    const handleOptionSelect = (value: string) => {
        setFormData({ ...formData, role: value });
        setIsDropdownOpen(false);
    };

    return (
        <main className='w-full h-screen flex pt-16 overflow-hidden'>

            {/* Left Section (Form) */}
            <section className='w-1/2 flex flex-col gap-2 p-[30px_0_0_120px]'>
                <div className=''>
                    <h1 className='text-2xl font-semibold w-[538px] h-[32px] leading-[100%]'>Join easy lab for a new era of <span className='text-[#01368B]'>Lab management</span> </h1>
                    <p className='font-semibold w-[533px] h-[24px]'>Faculty Details</p>
                </div>

                <div className="bg-gray-300 w-[400px] rounded-full h-1.5 mb-[10px]">
                    <div className="bg-[#01368B] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>

                {/* Facility Name and Facility Number Side by Side */}
                <div className='flex gap-4 w-[400px]'>
                    <div className='flex flex-col gap-0 flex-1 w-1/2'>
                        <label htmlFor='faculty'>Facility Name</label>
                        <input
                            name="facilityName"
                            id='faculty'
                            placeholder='Facility Name'
                            type='text'
                            value={formData.facilityName}
                            onChange={handleFormChange}
                            className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md h-12 px-4 mb-4'
                        />
                    </div>

                    <div className='flex flex-col gap-0 flex-1 w-1/2'>
                        <label htmlFor='email'>Facility Number</label>
                        <input
              
                            id='email'
                            placeholder='Facility Number'
                            name="facilityNumber"
                            type='text'
                            value={formData.facilityNumber}
                            onChange={handleFormChange}
                            className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md h-12 px-4 mb-4'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-0 '>
                    <label htmlFor='department'>Department</label>
                    <input
                        id='department'
                        name="departmentName"
                        placeholder='Department'
                        type='text'
                        value={formData.departmentName}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-[400px] h-12 px-4 mb-4'
                    />
                </div>

                <div className='flex flex-col gap-0'>
                    <label htmlFor='role'>Role</label>
                    {/* Custom Dropdown */}
                    <div className='relative'>
                        <button
                            type='button'
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-[400px] h-12 px-4 mb-4 text-left flex items-center justify-between'
                        >
                            {formData.role || 'Select Role'}
                            <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {/* Dropdown Options */}
                        {isDropdownOpen && (
                            <div className='absolute bottom-16 z-10 w-[400px] bg-white border border-gray-300 rounded-md shadow-lg mt-1'>
                                {['admin', 'scientist', 'Receptionist'].map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 hover:text-black ${formData.role === option ? 'bg-[#01368B] text-white' : ''}`}
                                    >
                                        {option}
                                        {formData.role === option && <Check className='h-5 w-5' />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='w-[400px] flex justify-center gap-4 mb-8'>
                    <button className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-2 rounded-md' onClick={nextStep}>
                        <p>Next</p>
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>

            {/* Right Section (Image) */}
            <section className='w-1/2 h-screen sticky top-0 overflow-hidden'>
                <Image
                    src={lab}
                    alt='Woman working in a laboratory'
                    layout='fill'
                    objectFit='cover'
                    className='absolute inset-0'
                />
            </section>
        </main>
    )
}

export default FormPage2;