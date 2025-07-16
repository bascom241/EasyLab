'use client'
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

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

    const handleOptionSelect = (value: string) => {
        setFormData({ ...formData, role: value });
        setIsDropdownOpen(false);
    };

    return (
        <main className='w-full min-h-screen flex justify-center pt-20 px-4 sm:px-8'>
            <section className='w-full max-w-xl flex flex-col gap-4'>
                <div>
                    <h1 className='text-2xl sm:text-3xl font-semibold leading-tight'>
                        Join easy lab for a new era of <span className='text-[#01368B]'>Lab management</span>
                    </h1>
                    <p className='font-semibold'>Faculty Details</p>
                </div>

                <div className="bg-gray-300 w-full rounded-full h-1.5">
                    <div className="bg-[#01368B] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>

                <div className='flex flex-col sm:flex-row gap-4'>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor='faculty'>Facility Name</label>
                        <input
                            name="facilityName"
                            id='faculty'
                            placeholder='Facility Name'
                            type='text'
                            value={formData.facilityName}
                            onChange={handleFormChange}
                            className='border-2 border-gray-300 focus:border-[#01368B] focus:outline-none rounded-md h-12 px-4'
                        />
                    </div>

                    <div className='flex flex-col flex-1'>
                        <label htmlFor='facilityNumber'>Facility Number</label>
                        <input
                            id='facilityNumber'
                            placeholder='Facility Number'
                            name="facilityNumber"
                            type='text'
                            value={formData.facilityNumber}
                            onChange={handleFormChange}
                            className='border-2 border-gray-300 focus:border-[#01368B] focus:outline-none rounded-md h-12 px-4'
                        />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='department'>Department</label>
                    <input
                        id='department'
                        name="departmentName"
                        placeholder='Department'
                        type='text'
                        value={formData.departmentName}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:border-[#01368B] focus:outline-none rounded-md h-12 px-4'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='role'>Role</label>
                    <div className='relative'>
                        <button
                            type='button'
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='border-2 border-gray-300 focus:border-[#01368B] focus:outline-none rounded-md w-full h-12 px-4 text-left flex items-center justify-between'
                        >
                            {formData.role || 'Select Role'}
                            <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {isDropdownOpen && (
                            <div className='absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1'>
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

                <div className='w-full flex justify-center mt-4 mb-8'>
                    <button
                        className='bg-[#01368B] w-1/2 min-w-[150px] flex items-center justify-center gap-3 text-white p-2 rounded-md'
                        onClick={nextStep}
                    >
                        <p>Next</p>
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>
        </main>
    );
}

export default FormPage2;
